// src/components/pages/games/CipherChallenge/CipherTools.js
import React, { useState, useEffect } from 'react';
import { 
  FaFont, FaRandom, FaExchangeAlt, FaChartBar, 
  FaSlidersH, FaAlignLeft, FaCalculator
} from 'react-icons/fa';
import './CipherTools.css';

const CipherTools = ({ activeTool, onToolSelect, cipherType, ciphertext }) => {
  const [frequencyData, setFrequencyData] = useState([]);
  const [caesarShift, setCaesarShift] = useState(13); // Default to ROT13
  const [caesarResult, setCaesarResult] = useState('');
  const [atbashResult, setAtbashResult] = useState('');
  const [binaryResult, setBinaryResult] = useState('');
  const [hexResult, setHexResult] = useState('');
  
  // Determine which tools are applicable for the current cipher type
  const getAvailableTools = () => {
    const allTools = [
      { id: 'frequency', name: 'Frequency Analysis', icon: <FaChartBar />, universal: true },
      { id: 'caesar', name: 'Caesar Shift', icon: <FaExchangeAlt />, forTypes: ['Caesar Shift', 'ROT13', 'Substitution'] },
      { id: 'atbash', name: 'Atbash Cipher', icon: <FaRandom />, forTypes: ['Atbash', 'Substitution'] },
      { id: 'binary', name: 'Binary Converter', icon: <FaCalculator />, forTypes: ['Binary'] },
      { id: 'hex', name: 'Hex Decoder', icon: <FaCalculator />, forTypes: ['Hex'] },
      { id: 'wordpattern', name: 'Word Pattern', icon: <FaAlignLeft />, forTypes: ['Substitution'] },
      { id: 'custom', name: 'Custom Mapping', icon: <FaSlidersH />, forTypes: ['Substitution'] },
    ];
    
    return allTools.filter(tool => 
      tool.universal || (tool.forTypes && tool.forTypes.includes(cipherType))
    );
  };
  
  // Update analysis tools when ciphertext changes
  useEffect(() => {
    if (!ciphertext) return;
    
    // Frequency analysis
    const frequencyMap = {};
    const text = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let char of text) {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    
    const totalChars = text.length;
    const frequencyArray = Object.entries(frequencyMap)
      .map(([char, count]) => ({
        char,
        count,
        percentage: (count / totalChars) * 100
      }))
      .sort((a, b) => b.count - a.count);
    
    setFrequencyData(frequencyArray);
    
    // Generate other decodings
    if (ciphertext && cipherType) {
      // Caesar shift
      handleCaesarShiftChange(caesarShift);
      
      // Atbash
      const atbash = performAtbash(ciphertext);
      setAtbashResult(atbash);
      
      // Binary
      if (cipherType === 'Binary') {
        const binary = binaryToText(ciphertext);
        setBinaryResult(binary);
      }
      
      // Hex
      if (cipherType === 'Hex') {
        const hex = hexToText(ciphertext);
        setHexResult(hex);
      }
    }
  }, [ciphertext, cipherType]);
  
  const handleCaesarShiftChange = (shift) => {
    setCaesarShift(shift);
    
    if (ciphertext) {
      const result = performCaesarShift(ciphertext, shift);
      setCaesarResult(result);
    }
  };
  
  // Caesar shift implementation
  const performCaesarShift = (text, shift) => {
    return text.replace(/[a-zA-Z]/g, char => {
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const offset = isUpperCase ? 65 : 97;
      
      // Apply shift and wrap around the alphabet (26 letters)
      return String.fromCharCode(
        ((code - offset + shift) % 26 + 26) % 26 + offset
      );
    });
  };
  
  // Atbash cipher implementation
  const performAtbash = (text) => {
    return text.replace(/[a-zA-Z]/g, char => {
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const offset = isUpperCase ? 65 : 97;
      
      // Calculate position from end of alphabet
      return String.fromCharCode(
        offset + 25 - (code - offset)
      );
    });
  };
  
  // Binary to text conversion
  const binaryToText = (binary) => {
    // Remove spaces and other non-binary characters
    const cleanBinary = binary.replace(/[^01]/g, '');
    
    // Group into bytes (8 bits)
    const bytes = cleanBinary.match(/.{1,8}/g) || [];
    
    try {
      // Convert each binary byte to decimal, then to ASCII character
      return bytes.map(byte => 
        String.fromCharCode(parseInt(byte, 2))
      ).join('');
    } catch (e) {
      return 'Invalid binary data';
    }
  };
  
  // Hex to text conversion
  const hexToText = (hex) => {
    // Remove spaces and other non-hex characters
    const cleanHex = hex.replace(/[^0-9A-Fa-f]/g, '');
    
    try {
      // Convert hex pairs to ASCII characters
      let result = '';
      for (let i = 0; i < cleanHex.length; i += 2) {
        result += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
      }
      return result;
    } catch (e) {
      return 'Invalid hex data';
    }
  };
  
  // Render the appropriate tool based on the active selection
  const renderActiveTool = () => {
    if (!activeTool) return null;
    
    switch (activeTool) {
      case 'frequency':
        return (
          <div className="frequency-analysis-tool">
            <h4>Letter Frequency</h4>
            <div className="frequency-table">
              <div className="frequency-header">
                <span>Letter</span>
                <span>Count</span>
                <span>Frequency</span>
                <span>Histogram</span>
              </div>
              <div className="frequency-body">
                {frequencyData.map(item => (
                  <div key={item.char} className="frequency-row">
                    <span className="frequency-char">{item.char}</span>
                    <span className="frequency-count">{item.count}</span>
                    <span className="frequency-percent">{item.percentage.toFixed(1)}%</span>
                    <div className="frequency-bar-container">
                      <div 
                        className="frequency-bar" 
                        style={{ width: `${Math.min(100, item.percentage * 3)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="frequency-info">
              <p>In English text, the most common letters are E, T, A, O, I, N, S, H, R, D, L, U.</p>
            </div>
          </div>
        );
        
      case 'caesar':
        return (
          <div className="caesar-shift-tool">
            <h4>Caesar Shift Tool</h4>
            <div className="shift-control">
              <label htmlFor="shift-value">Shift Value:</label>
              <input
                id="shift-value"
                type="number"
                min="1"
                max="25"
                value={caesarShift}
                onChange={(e) => handleCaesarShiftChange(parseInt(e.target.value, 10))}
              />
              <div className="shift-buttons">
                {[1, 3, 5, 7, 13, 25].map(shift => (
                  <button 
                    key={shift}
                    onClick={() => handleCaesarShiftChange(shift)}
                    className={caesarShift === shift ? 'active' : ''}
                  >
                    {shift === 13 ? 'ROT13' : `+${shift}`}
                  </button>
                ))}
              </div>
            </div>
            <div className="shift-result">
              <h5>Result:</h5>
              <div className="result-text">{caesarResult}</div>
            </div>
          </div>
        );
        
      case 'atbash':
        return (
          <div className="atbash-tool">
            <h4>Atbash Cipher</h4>
            <p className="tool-description">
              Atbash is a simple substitution cipher that maps each letter to its reverse position in the alphabet (A→Z, B→Y, etc).
            </p>
            <div className="atbash-result">
              <h5>Result:</h5>
              <div className="result-text">{atbashResult}</div>
            </div>
          </div>
        );
        
      case 'binary':
        return (
          <div className="binary-tool">
            <h4>Binary Decoder</h4>
            <p className="tool-description">
              Converting 8-bit binary values to ASCII text:
            </p>
            <div className="binary-result">
              <h5>Result:</h5>
              <div className="result-text">{binaryResult}</div>
            </div>
          </div>
        );
        
      case 'hex':
        return (
          <div className="hex-tool">
            <h4>Hex Decoder</h4>
            <p className="tool-description">
              Converting hexadecimal values to ASCII text:
            </p>
            <div className="hex-result">
              <h5>Result:</h5>
              <div className="result-text">{hexResult}</div>
            </div>
          </div>
        );
        
      case 'wordpattern':
        return (
          <div className="wordpattern-tool">
            <h4>Word Pattern Analysis</h4>
            <p className="tool-description">
              This tool helps analyze substitution ciphers by showing the pattern of repeated letters in words.
            </p>
            <div className="pattern-examples">
              <h5>Example Patterns:</h5>
              <div className="pattern-item">
                <span className="pattern-word">HELLO</span>
                <span className="pattern-code">⟶</span>
                <span className="pattern-result">1.2.3.3.4</span>
                <span className="pattern-explanation">(Each number represents a unique letter position)</span>
              </div>
              <div className="pattern-item">
                <span className="pattern-word">BANANA</span>
                <span className="pattern-code">⟶</span>
                <span className="pattern-result">1.2.3.2.3.2</span>
              </div>
            </div>
            {/* Add actual word pattern analysis here if needed */}
          </div>
        );
        
      case 'custom':
        return (
          <div className="custom-mapping-tool">
            <h4>Custom Letter Mapping</h4>
            <p className="tool-description">
              Create your own substitution mapping to test theories about the cipher.
            </p>
            <div className="mapping-table">
              {/* This would be a complex component allowing users to map cipher letters to plaintext */}
              <p>Custom mapping functionality would go here, allowing you to test different letter substitutions.</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const availableTools = getAvailableTools();
  
  return (
    <div className="cipher-tools">
      <div className="tools-menu">
        {availableTools.map(tool => (
          <button
            key={tool.id}
            className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => onToolSelect(tool.id)}
          >
            {tool.icon}
            <span className="tool-name">{tool.name}</span>
          </button>
        ))}
      </div>
      
      <div className="tool-display">
        {renderActiveTool()}
      </div>
    </div>
  );
};

export default CipherTools;
