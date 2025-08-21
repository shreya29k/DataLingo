import React from 'react';
import './Research.css';
import DataLingoLogo from './DataLingoLogo';
import dnn from '../assets/ai.jpg';
import rnn from '../assets/rnn.jpg';
import ctransformer from '../assets/ai2.jpg';

export default function Research({ theme }) {
    const isDark = theme === 'dark';

    return (
        <div className={`research-page ${isDark ? 'dark' : 'light'}`}>
            {/* Navbar */}
            <nav
                className={`research-navbar w-full h-[56px] shadow-sm transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-800'
                    }`}
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-full w-full">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => (window.location.href = '/')}
                    >
                        <DataLingoLogo className="w-10 h-8" />
                        <span
                            className="text-xl font-bold text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(to right, #B57EDC, #9B5DE5)' }}
                        >
                            DataLingo
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="/" className="text-sm font-medium transition-colors duration-300 hover:text-[#B57EDC]">
                            Home
                        </a>
                    </div>
                </div>
            </nav>

            {/* Spacer */}
            <div className="h-10 sm:h-16" />

            {/* DNN Section */}
            <section className="research-section">
                <img src={dnn} alt="ai img" className="research-image" />
                <div className={`research-text full-width ${isDark ? 'dark-text' : 'light-text'}`}>
                    <h2 className="research-heading">Natural Language to Query Translation</h2>
                    <p>
                        Datalingo transforms everyday English into precise, executable database queries using the Mistral 7B Instruct Q4_K_M model. When a user enters a prompt, the model interprets the intent behind the request, identifies relevant entities, and determines the conditions that need to be applied. It then converts this understanding into the correct syntax for the chosen database, whether that is SQL for relational systems like PostgreSQL and MySQL, a JSON-based aggregation pipeline for MongoDB, or a filter query format for Solr. Mistral’s instruction-tuned architecture enables it to handle variations in sentence structure and vocabulary, ensuring that differently worded prompts with the same meaning result in equivalent queries. This approach allows users to retrieve complex data without any knowledge of database languages, making database access more intuitive and accessible to non-technical users.
                    </p>
                </div>
            </section>

            {/* RNN Section */}
            <section className="research-section">
                <img src={rnn} alt="ai img" className="research-image" />
                <div className={`research-text limited-width ${isDark ? 'dark-text' : 'light-text'}`}>
                    <h2 className="research-heading">Multi-Database Query Adaptation</h2>
                    <p>
                        Datalingo employs the Q4_K_M quantized version of the Mistral 7B Instruct model to achieve an optimal balance between performance and efficiency. Quantization reduces the precision of the model’s numerical weights from higher-bit formats to a compact 4-bit representation, significantly decreasing memory requirements and improving inference speed while maintaining high accuracy in query generation. The Q4_K_M variant is known for preserving model quality even at reduced precision, making it well-suited for resource-constrained environments. This optimization allows Datalingo to run entirely on local hardware, including systems with limited GPU memory or even CPU-only setups, thereby eliminating reliance on cloud-based AI services. By processing queries locally, the platform ensures faster response times, enhanced data privacy, and full control over sensitive information while still delivering the robust language understanding and reasoning capabilities of a large instruction-tuned model.
                    </p>
                </div>
            </section>

            {/* C-Transformer Section */}
            <section className="research-section">
                <img src={ctransformer} alt="ai img" className="research-image" />
                <div className={`research-text limited-width ${isDark ? 'dark-text' : 'light-text'}`}>
                    <h2 className="research-heading">Efficient Local Deployment with Q4_K_M Quantization</h2>
                    <p>
                        Datalingo is designed to seamlessly work with multiple database systems, enabling users to query diverse data sources through a single natural language interface. Once Mistral 7B Instruct interprets the user’s request and generates a logical representation of the intended query, the system’s backend adapts this output to match the syntax and conventions of the target database. For relational databases such as PostgreSQL and MySQL, the system formats the query in standard SQL, ensuring compatibility with table structures and relational joins. For MongoDB, it generates JSON-based aggregation pipelines that align with NoSQL’s document-oriented approach. For search platforms like Solr, it produces filter and keyword-based queries optimized for text retrieval. This adaptive process allows the same user prompt to be executed across different technologies without requiring the user to understand each system’s query language. As a result, Datalingo eliminates the fragmentation between database types, making cross-platform data access more efficient, consistent, and user-friendly.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className={`research-footer ${isDark ? 'dark-footer' : 'light-footer'}`}>
                <p>© {new Date().getFullYear()} DataLingo. All rights reserved.</p>
            </footer>
        </div>
    );
}