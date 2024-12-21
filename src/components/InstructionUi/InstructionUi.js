import React, { useState, useEffect } from 'react';
import './InstructionUi.css';

const InstructionUi = () => {
    const [instructions, setInstructions] = useState([]);
    const [editInstruction, setEditInstruction] = useState(null);
    const [deployedInstructions, setDeployedInstructions] = useState([]);
    const [undeployedInstructions, setunDeployedInstructions] = useState([]);
    const [isNew, setIsNew] = useState(false);

    const fetchInstructions = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/instructions`)
            .then((response) => response.json())
            .then((data) => {
                const undeployed = data.filter((i) => !i.has_been_deployed);
                const deployed = data.filter((i) => i.has_been_deployed);
                undeployed.sort((a, b) => new Date(b.last_edit) - new Date(a.last_edit));
                deployed.sort((a, b) => new Date(b.deploy_time) - new Date(a.deploy_time));
                setDeployedInstructions(deployed);
                setunDeployedInstructions(undeployed);
            })
            .catch((error) => console.error('Error fetching instructions:', error));
    };

    useEffect(() => {
        fetchInstructions();
    }, []);

    const handleSave = () => {
        const method = isNew ? 'POST' : 'POST';
        const endpoint = isNew
            ? `${process.env.REACT_APP_BACKEND_URL}/api/instruction/new`
            : `${process.env.REACT_APP_BACKEND_URL}/api/instruction/${editInstruction._id}`;

        fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editInstruction),
        })
            .then((response) => response.json())
            .then(() => {
                alert(isNew ? 'Instruction added successfully' : 'Instruction updated successfully');
                setEditInstruction(null);
                setIsNew(false);
                fetchInstructions();
            })
            .catch((error) => console.error('Error saving instruction:', error));
    };

    const handleCancel = () => {
        setEditInstruction(null);
        setIsNew(false);
    };

    const handleDeploy = (instructionId) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/instruction/deploy/${instructionId}`, {
            method: 'POST',
        })
            .then(() => {
                alert('Instruction deployed successfully');
                fetchInstructions();
            })
            .catch((error) => console.error('Error deploying instruction:', error));
    };

    const handleDelete = (instructionId) => {
        if (window.confirm('Are you sure you want to delete this instruction?')) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/instruction/${instructionId}`, {
                method: 'DELETE',
            })
                .then(() => {
                    fetchInstructions();
                })
                .catch((error) => console.error('Error deleting instruction:', error));
        }
    };

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
            <button
                className="add-new-instruction-button"
                onClick={() => {
                    setEditInstruction({ content: '', description: '' });
                    setIsNew(true);
                }}
            >
                Add New Instruction
            </button>

            <h2 className="deployed-heading">Deployed Instructions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Deploy Time</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Deploy</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {deployedInstructions.map((instruction) => (
                        <tr key={instruction._id}
                            className={instruction.deployed === true ? 'highlight-row' : ''}
                            >
                            <td>{new Date(instruction.deploy_time).toLocaleString()}</td>
                            <td>{instruction.description}</td>
                            <td>
                                <button onClick={() => setEditInstruction(instruction)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeploy(instruction._id)}>Deploy</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(instruction._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="undeployed-heading">Undeployed Instructions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Edit Time</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Deploy</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {undeployedInstructions.map((instruction) => (
                        <tr key={instruction._id}>
                            <td>{new Date(instruction.last_edit).toLocaleString()}</td>
                            <td>{instruction.description}</td>
                            <td>
                                <button onClick={() => setEditInstruction(instruction)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeploy(instruction._id)}>Deploy</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(instruction._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstructionUi;
