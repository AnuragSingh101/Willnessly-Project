import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRemediesForm = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState('');
    const [contraindications, setContraindications] = useState('');
    const [sourceReference, setSourceReference] = useState('');
    const [symptoms, setSymptoms] = useState(['']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleSymptomChange = (index, value) => {
        const newSymptoms = [...symptoms];
        newSymptoms[index] = value;
        setSymptoms(newSymptoms);
    };

    const handleAddIngredient = () => setIngredients([...ingredients, '']);
    const handleRemoveIngredient = (index) =>
        setIngredients(ingredients.filter((_, i) => i !== index));

    const handleAddSymptom = () => setSymptoms([...symptoms, '']);
    const handleRemoveSymptom = (index) =>
        setSymptoms(symptoms.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const remedyData = {
            name,
            ingredients,
            instructions,
            contraindications,
            source_reference: sourceReference,
            symptoms: symptoms.map((symptom) => ({ name: symptom })),
        };
    
        try {
            const response = await axios.post('http://localhost:5000/api/remedy/add', remedyData);
            setSuccess('Remedy added successfully!');
            setError('');
            setTimeout(() => navigate('/remedies'), 2000); // Redirect after success
        } catch (error) {
            console.error('Error adding remedy:', error);
            setError('Failed to add remedy. Please try again.');
            setSuccess('');
        }
    };
    

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add a New Remedy</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Remedy Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Ingredients:</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} style={styles.inlineGroup}>
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                style={styles.input}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveIngredient(index)}
                                style={styles.removeBtn}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddIngredient} style={styles.addBtn}>
                        Add Ingredient
                    </button>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Instructions:</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        style={styles.textarea}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Contraindications:</label>
                    <textarea
                        value={contraindications}
                        onChange={(e) => setContraindications(e.target.value)}
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Source Reference:</label>
                    <input
                        type="text"
                        value={sourceReference}
                        onChange={(e) => setSourceReference(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Symptoms:</label>
                    {symptoms.map((symptom, index) => (
                        <div key={index} style={styles.inlineGroup}>
                            <input
                                type="text"
                                value={symptom}
                                onChange={(e) => handleSymptomChange(index, e.target.value)}
                                style={styles.input}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveSymptom(index)}
                                style={styles.removeBtn}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddSymptom} style={styles.addBtn}>
                        Add Symptom
                    </button>
                </div>

                <button type="submit" style={styles.submitBtn}>
                    Submit Remedy
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        minHeight: '80px',
    },
    inlineGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    },
    addBtn: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    removeBtn: {
        marginLeft: '10px',
        padding: '5px 10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    submitBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#003366',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    error: {
        color: '#e74c3c',
        marginBottom: '10px',
    },
    success: {
        color: '#4caf50',
        marginBottom: '10px',
    },
};

export default AddRemediesForm;
