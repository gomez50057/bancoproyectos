// Archivo: src/components/FAQ.js
import React, { useState } from 'react';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { categories, questions } from '../../../utils/faqData';
import './FAQ.css';
// import Header from './Header';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('ArchivosAdjuntos');
  const [openQuestion, setOpenQuestion] = useState(null);

  const handleToggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq">
      {/* <Header></Header> */}
      <div className="faq-title">
        <h1>Preguntas Frecuentes</h1>
        <p>¿Cómo Empezar?</p>
      </div>

      <div className="faq-container">
        <div className="faq-sidebar">
          <ul className="faq-category-list">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`faq-category-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="faq-content">
          {questions[activeCategory].map((q, index) => (
            <div key={index} className="faq-question">
              <div
                className="faq-question-header"
                onClick={() => handleToggleQuestion(index)}
              >
                <span>{q.question}</span>
                {openQuestion === index ? <ExpandLess /> : <ExpandMore />}
              </div>
              {openQuestion === index && (
                <div className="faq-answer">
                  <p>{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
