.grc-wizard-page {
  position: relative;
  min-height: 100vh;
  background-image: url('./GRCbackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center; 
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden; 
}

.grc-wizard-container {
  max-width: 90vw;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.8); 
  border: 0.125rem solid #b30000;
  border-radius: 0.75rem;
  color: #fff;
  font-family: "Courier New", monospace;
  transition: all 0.1s ease;
}

.grc-title {
  font-size: 3rem;
  color: #b30000;
  text-align: center;
  margin-bottom: 0.75rem;
  word-wrap: break-word;
}

.grc-subtitle {
  font-size: 1.1rem;
  color: #fff;
  text-align: center;
  margin-bottom: 1.75rem;
  word-wrap: break-word;
}

.grc-wizard-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.grc-control {
  flex: 1;
  min-width: 9.375rem;
}

.grc-label {
  display: block;
  font-size: 1.2rem;
  color: #e60000;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
}

.grc-select {
  width: 100%;
  padding: 0.75rem;
  background-color: #0d0d0d;
  color: #e60000;
  border: 0.125rem solid #fff;
  border-radius: 0.75rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.grc-select:hover,
.grc-select:focus {
  border-color: #cc0000;
  background-color: #1a1a1a; 
}

.grc-generate-btn {
  flex: 1;
  min-width: 6.25rem;
  padding: 0.75rem 1.25rem;
  background-color: #0d0d0d;
  color: #fff;
  border: 0.125rem solid #e60000;
  border-radius: 1.25rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grc-generate-btn:hover:not(:disabled) {
  background-color: #fff;
  color: #000;
}

.grc-generate-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}


.grc-button-loading-version1 {
  display: inline-block;
  position: relative;
  font-family: "Courier New", monospace;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #e60000;
  animation: terminalTyping 2s steps(14, end) infinite alternate;
}


@keyframes terminalTyping {
  0% {
    width: 0ch;
  }
  50% {
    width: 11ch; 
  }
  100% {
    width: 11ch;
    border-right-color: transparent;
  }
}


.grc-question-container {
  margin-bottom: 1.5rem;
}

.grc-question {
  font-size: 1.8rem;
  color: #fff;
  text-align: center;
  margin-bottom: 1rem;
  word-wrap: break-word;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.grc-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 90%;
  margin: 0 auto;
}

.grc-option-btn {
  padding: 0.75rem 1rem;
  background-color: #0d0d0d;
  color: #fff;
  border: 0.125rem solid #b30000;
  border-radius: 0.75rem;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
  word-wrap: break-word;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.grc-option-btn:hover:not(:disabled) {
  background-color: #696969;
  color: #000;
  transform: translateY(-2px); 
}

.grc-option-btn:active:not(:disabled) {
  transform: translateY(0);
}

.grc-option-btn.selected {
  background-color: #000;
  color: #fff;
}

.grc-feedback {
  padding: 1rem;
  margin-top: 1.5rem;
  border-radius: 0.375rem;
  font-size: 1.2rem;
  text-align: center;
  position: relative;
  line-height: 1.5;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.grc-feedback.correct {
  background-color: #4caf50; 
  color: #fff;
  border: 0.125rem solid #2e7d32;
}

.grc-feedback.incorrect {
  background-color: #f44336; 
  color: #fff;
  border: 0.125rem solid #c62828;
}

.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #696969;
  color: #000;
  border: 0.0625rem solid #000;
  border-radius: 1.25rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.copy-btn:active {
  transform: scale(0.95);
  opacity: 0.8;
}

.copy-btn:hover {
  background-color: #fff;
  color: #000;
}


@media (min-width: 768px) {
  .grc-wizard-container {
    padding: 2rem;
  }
  .grc-title {
    font-size: 3.5rem;
  }
  .grc-subtitle {
    font-size: 1.2rem;
  }
  .grc-question-container {
    margin-bottom: 1.75rem;
  }
  .grc-question {
    font-size: 2rem;
  }
  .grc-option-btn {
    font-size: 1.1rem;
  }
  .grc-feedback {
    font-size: 1.3rem;
  }
}

@media (min-width: 1024px) {
  .grc-wizard-container {
    padding: 2.5rem;
  }
  .grc-title {
    font-size: 4rem;
  }
  .grc-subtitle {
    font-size: 1.3rem;
  }
  .grc-question {
    font-size: 2.2rem;
  }
  .grc-option-btn {
    font-size: 1.2rem;
  }
  .grc-feedback {
    font-size: 1.4rem;
  }
}

@media (max-width: 767px) {
  .grc-wizard-container {
    padding: 1rem;
  }
  .grc-title {
    font-size: 2.5rem;
  }
  .grc-subtitle {
    font-size: 1rem;
  }
  .grc-wizard-controls {
    flex-direction: column;
  }
  .grc-control {
    min-width: 100%;
  }
  .grc-generate-btn {
    width: 100%;
    padding: 0.75rem 1rem;
  }
  .button-and-sphere {
    flex-direction: column;
    align-items: flex-start;
  }
  .grc-question {
    font-size: 1.6rem;
  }
  .grc-option-btn {
    font-size: 1rem;
  }
  .grc-feedback {
    font-size: 1.1rem;
  }
}
