import React, { useState, useRef } from 'react';
import './AnalogyHub.css';
import loadingImage from './loading2.png';

const ENDPOINT = "/api"; 

const AnalogyHub = () => {
  const [analogyType, setAnalogyType] = useState('single');
  const [inputValues, setInputValues] = useState(['']);
  const [analogyCategory, setAnalogyCategory] = useState('real-world');
  const [isStreaming, setIsStreaming] = useState(false);
  const [generatedAnalogy, setGeneratedAnalogy] = useState('');

  const analogyRef = useRef(null);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setAnalogyType(type);

    switch (type) {
      case 'comparison':
        setInputValues(['', '']);
        break;
      case 'triple':
        setInputValues(['', '', '']);
        break;
      default:
        setInputValues(['']);
    }
  };

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleGenerateClick = () => {
    setIsStreaming(true);
    setGeneratedAnalogy('');

    const data = {
      analogy_type: analogyType,
      category: analogyCategory,
      concept1: inputValues[0] || '',
      concept2: inputValues[1] || '',
      concept3: inputValues[2] || ''
    };

    fetch(`${ENDPOINT}/analogy/stream_analogy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then((res) => {
      if (!res.ok) {
        setIsStreaming(false);
        return res.text().then((text) => {
          console.error('Error from server: ', text);
          setGeneratedAnalogy('An error occurred streaming the analogy.');
        });
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      function readChunk() {
        reader.read().then(({ done, value }) => {
          if (done) {
            setIsStreaming(false);
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          setGeneratedAnalogy((prev) => prev + chunk);
          readChunk();
        });
      }
      readChunk();
    })
    .catch((err) => {
      console.error('Streaming error:', err);
      setGeneratedAnalogy('An error occurred streaming the analogy.');
      setIsStreaming(false);
    });
  };

  const handleCopyClick = () => {
    if (generatedAnalogy) {
      navigator.clipboard.writeText(generatedAnalogy)
        .then(() => {
          console.log('Copied to clipboard');
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    }
  };

  return (
    <div className="analogy-hub-container">
      <h1 className="analogy-hub-title">Analogy Hub</h1>
      <p className="analogy-hub-tagline">runtime-error.r00.</p>

      <div className="analogy-hub-form">
        <div className="analogy-type-section">
          <select value={analogyType} onChange={(e) => handleTypeChange(e)} className="analogy-hub-input">
            <option value="single">Single</option>
            <option value="comparison">Comparison</option>
            <option value="triple">Triple Comparison</option>
          </select>
        </div>

        <div className="analogy-input-fields">
          {inputValues.map((value, index) => (
            <input
              key={index}
              type="text"
              className="analogy-hub-input"
              value={value}
              placeholder={`Enter concept ${index + 1}`}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>

        <div className="analogy-category-section">
          <select
            value={analogyCategory}
            onChange={(e) => setAnalogyCategory(e.target.value)}
            className="analogy-hub-input"
          >
            <option value="real-world">Real World Analogy</option>
            <option value="video-games">Video Games</option>
            <option value="tv-show">TV Show</option>
            <option value="sports">Sports</option>
            <option value="fiction">Fiction</option>
            <option value="food">Food & Cooking</option>
            <option value="relationships">Relationships</option>
            <option value="music">Music & Instruments</option>
            <option value="animals">Animals</option>
            <option value="nature">Nature & Environment</option>
            <option value="travel">Travel & Exploration</option>
            <option value="history">Historical Events</option>
            <option value="technology">Technology</option>
            <option value="mythology">Mythology</option>
            <option value="business">Business & Economics</option>
            <option value="art">Art & Creativity</option>
            <option value="school">School & Education</option>
            <option value="construction">Construction & Engineering</option>
            <option value="space">Space & Astronomy</option>
            <option value="superheroes">Superheroes & Comic Books</option>
            <option value="medieval">Medieval Times</option>
            <option value="movies">Movies & Cinema</option>
            <option value="everyday-life">Everyday Life</option>
            <option value="gardening">Gardening</option>
            <option value="mr-robot">Mr Robot</option>
          </select>
        </div>

        <div className="button-and-loader">
          <button
            className="analogy-generate-button"
            onClick={handleGenerateClick}
            disabled={isStreaming}
          >
            {isStreaming ? "Streaming..." : "Generate Analogy"}
          </button>

          {isStreaming && (
            <img
              src={loadingImage}
              alt="Loading..."
              className="loading-icon"
            />
          )}
        </div>
      </div>

      {generatedAnalogy && (
        <div className="analogy-output-container" ref={analogyRef}>
          <button className="copy-button" onClick={handleCopyClick}>Copy</button>
          <p className="generated-analogy">{generatedAnalogy}</p>
        </div>
      )}
    </div>
  );
};

export default AnalogyHub;

