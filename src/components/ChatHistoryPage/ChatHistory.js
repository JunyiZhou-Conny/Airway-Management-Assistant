import React, { useState, useEffect } from 'react';
import './ChatHistoryStyle.css';

export default function ChatHistory() {
    const [participantID, setParticipantID] = useState('');
    const [conversations, setConversations] = useState([]);
    const [recentCases, setRecentCases] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRecentCases();
    }, []);

    const handleDeleteConversation = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this chat history? This action cannot be undone.');
        
        if (confirmDelete) {
            try {
                const encodedID = encodeURIComponent(encodeURIComponent(id));
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-conversation-history/${encodedID}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove the deleted case from the list
                    setRecentCases(prevCases => 
                        prevCases.filter(caseItem => caseItem.participantID !== id)
                    );
                } else {
                    console.error('Failed to delete conversation history');
                    window.alert('Failed to delete conversation history');
                }
            } catch (error) {
                console.error('Error deleting conversation history:', error);
                window.alert('Error deleting conversation history');
            }
        }
    };


    const formatMassage = (text) => {
        let formattedText = text.replace(/\n/g, '<br />');
        formattedText = formattedText.replace(/<br><br>/g, '<br>');
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        formattedText = formattedText.replace(/<brbr>/g, '<br>');
        return formattedText;
    }

    const fetchRecentCases = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-last-cases`);
            if (!response.ok) throw new Error('Failed to fetch recent cases');
            const data = await response.json();
            setRecentCases(data);
        } catch (error) {
            console.error('Error fetching recent cases:', error);
            setError('Failed to load recent cases');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setParticipantID(e.target.value);
        setError('');
    };

    const fetchHistory = async (id = participantID) => {
        setIsLoading(true);
        setError('');
        setIsSearching(true);

        try {
            const encodedID = encodeURIComponent(encodeURIComponent(id));
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-conversation-history/${encodedID}`);
            if (!response.ok) throw new Error('Error fetching conversation history');

            const data = await response.json();
            if (!data.conversationHistory || data.conversationHistory.length === 0) {
                setError('No conversation history found for this ID');
                setConversations([]);
            } else {
                const sortedConversations = data.conversationHistory.sort((a, b) => 
                    new Date(b.timestamp) - new Date(a.timestamp)
                );
                setConversations(sortedConversations);
                setParticipantID(id);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error fetching conversation history');
            setConversations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoBack = () => {
        setIsSearching(false);
        setParticipantID('');
        setConversations([]);
        setError('');
    };

    const handleCaseClick = (id) => {
        fetchHistory(id);
    };

    return (
        <div className="chat-history-container">
            {!isSearching ? (
                <>
                    <div className="search-bar">
                        <input
                            type="text"
                            value={participantID}
                            onChange={handleInputChange}
                            placeholder="Enter Participant ID"
                        />
                        <button onClick={() => fetchHistory()}>Search</button>
                    </div>
                    <h2 className="recent-cases-title">Recent Cases</h2>
                    <table className="cases-table">
                        <thead>
                            <tr>
                                <th>Participant ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>View</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {recentCases.length > 0 ? (
                                recentCases.map((caseItem) => (
                                    <tr key={caseItem.participantID}>
                                        <td>{caseItem.participantID}</td>
                                        <td>{new Date(caseItem.timestamp).toLocaleDateString()}</td>
                                        <td>{new Date(caseItem.timestamp).toLocaleTimeString()}</td>
                                        <td>
                                            <button onClick={() => handleCaseClick(caseItem.participantID)}>
                                                View History
                                            </button>
                                        </td>
                                        <td>
                                            <button className="delete-button" onClick={() => handleDeleteConversation(caseItem.participantID)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{textAlign: 'center'}}>No past cases available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="conversation-view">
                    <div className="conversation-header">
                        <h2>Conversation ID: {participantID}</h2>
                        <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
                    </div>
                    {error ? (
                        <div className="error-message">{error}</div>
                    ) : isLoading ? (
                        <div>Loading...</div>
                    ) : conversations.length > 0 ? (
                        <div className="chat-window">
                            {conversations.map((conv, index) => (
                                <div key={index} className="conversation-group">
                                    <h3>Time: {new Date(conv.timestamp).toLocaleString()}</h3>
                                    {conv.history.map((msg, msgIndex) => (
                                        <div key={msgIndex} className={`message ${msg.sender}`}>
                                            {msg.type === 'text' ? (
                                                <div 
                                                className="formatted-text"
                                                dangerouslySetInnerHTML={{
                                                        __html: formatMassage(msg.text)
                                                    }}
                                                />
                                            ) : (
                                                <img src={msg.text} alt="Chatbot response" className="chat-image" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
