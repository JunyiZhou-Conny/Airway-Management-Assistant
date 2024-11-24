import React, { useState, useEffect } from 'react';
import './InstructionUi.css';

const InstructionUi = () => {
    const [instructions, setInstructions] = useState([]);
    const [editInstruction, setEditInstruction] = useState(null);
    const [isNew, setIsNew] = useState(false);

    // Fetch all instructions
    const fetchInstructions = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/instructions`)
            .then((response) => response.json())
            .then((data) => setInstructions(data))
            .catch((error) => console.error('Error fetching instructions:', error));
    };

    useEffect(() => {
        fetchInstructions();
    }, []);

    // Save an instruction (existing or new)
    const handleSave = () => {
        const method = isNew ? 'POST' : 'POST';
        const endpoint = isNew
            ? `${process.env.REACT_APP_BACKEND_URL}/api/instruction/new`
            : `${process.env.REACT_APP_BACKEND_URL}/api/instruction/${editInstruction._id}`;

        fetch(endpoint, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editInstruction),
        })
            .then((response) => response.json())
            .then(() => {
                alert(isNew ? 'Instruction added successfully' : 'Instruction updated successfully');
                setEditInstruction(null);
                setIsNew(false);
                fetchInstructions(); // Refresh the instructions list
            })
            .catch((error) => console.error('Error saving instruction:', error));
    };

    // Cancel editing or creating
    const handleCancel = () => {
        setEditInstruction(null);
        setIsNew(false);
    };

    // Deploy an instruction
    const handleDeploy = (instructionId) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/instruction/deploy/${instructionId}`, {
            method: 'POST',
        })
            .then(() => {
                alert('Instruction deployed successfully');
                fetchInstructions(); // Refresh the instructions list
            })
            .catch((error) => console.error('Error deploying instruction:', error));
    };

    // Delete an instruction
    const handleDelete = (instructionId) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/instruction/${instructionId}`, {
            method: 'DELETE',
        })
            .then(() => {
                fetchInstructions(); // Refresh the instructions list
            })
            .catch((error) => console.error('Error deleting instruction:', error));
    };

    // Render edit/create view or main table
    if (editInstruction) {
        return (
            <div className="instruction-container">
                <h1>{isNew ? 'Add New Instruction' : 'Edit Instruction'}</h1>
                <textarea
                    className="text-area"
                    value={editInstruction.content}
                    onChange={(e) =>
                        setEditInstruction({ ...editInstruction, content: e.target.value })
                    }
                    placeholder="Enter instruction content"
                />
                <input
                    type="text"
                    value={editInstruction.description}
                    onChange={(e) =>
                        setEditInstruction({ ...editInstruction, description: e.target.value })
                    }
                    placeholder="Enter description"
                />
                <div className="button-group">
                    <button className="save-button" onClick={handleSave}>
                        Save
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="instruction-ui">
            <h1>Instructions</h1>
            <button
                className="add-new-button"
                onClick={() => {
                    setEditInstruction({ content: '', description: '' });
                    setIsNew(true);
                }}
            >
                Add New Instruction
            </button>
            <h2>Deployed Instruction</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Deploy</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {instructions.filter((i) => i.deployed).map((instruction) => (
                        <tr key={instruction._id}>
                            <td>{new Date(instruction.last_edit).toLocaleString()}</td>
                            <td>{instruction.description}</td>
                            <td>
                                <button onClick={() => setEditInstruction(instruction)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDeploy(instruction._id)}>
                                    Deploy
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(instruction._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Undeployed Instructions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Deploy</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {instructions
                        .filter((i) => !i.deployed)
                        .sort((a, b) => new Date(b.last_edit) - new Date(a.last_edit))
                        .map((instruction) => (
                            <tr key={instruction._id}>
                                <td>{new Date(instruction.last_edit).toLocaleString()}</td>
                                <td>{instruction.description}</td>
                                <td>
                                    <button onClick={() => setEditInstruction(instruction)}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeploy(instruction._id)}>
                                        Deploy
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(instruction._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstructionUi;
