// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { executePromptQuery } from '../services/dataSourceService';

// const supportedDatabases = [
//   { label: 'MySQL', value: 'MYSQL' },
//   { label: 'PostgreSQL', value: 'POSTGRESQL' },
//   { label: 'MongoDB', value: 'MONGODB' },
//   { label: 'Excel', value: 'EXCEL' },
//   { label: 'CSV', value: 'CSV' },
// ];

// const schemaRegistry = {
//   MYSQL: {
//     users: { id: 'int', name: 'varchar', email: 'varchar' },
//     orders: { id: 'int', user_id: 'int', total: 'decimal', order_date: 'timestamp' },
//   },
//   // Add other DBs as needed
// };

// export default function QueryInterface() {
//   const [selectedDb, setSelectedDb] = useState('MYSQL');
//   const [availableTables, setAvailableTables] = useState([]);
//   const [selectedTables, setSelectedTables] = useState([]);
//   const [prompt, setPrompt] = useState('');
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         let res;

//         if (selectedDb === 'EXCEL' || selectedDb === 'CSV') {
//           if (!file) return;
//           const formData = new FormData();
//           formData.append('databaseType', selectedDb);
//           formData.append('file', file);

//           res = await axios.post('http://localhost:8084/api/datasource/tables', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' },
//           });
//         } else {
//           res = await axios.get('http://localhost:8084/api/datasource/tables', {
//             params: { databaseType: selectedDb },
//           });
//         }

//         setAvailableTables(res.data);
//       } catch (err) {
//         console.error('Error fetching tables:', err);
//         toast.error('Failed to fetch tables');
//         setAvailableTables([]);
//       }
//     };

//     fetchTables();
//   }, [selectedDb, file]);

//   const handleTableToggle = (table) => {
//     setSelectedTables((prev) =>
//       prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
//     );
//   };

//   const handleSubmit = async () => {
//     if (!prompt.trim() || selectedTables.length === 0) {
//       toast.error('Please enter a prompt and select at least one table.');
//       return;
//     }

//     setLoading(true);
//     toast.loading('Running query...');
//     setResponse(null);

//     const selectedSchema = Object.fromEntries(
//       selectedTables.map((table) => [table, schemaRegistry[selectedDb]?.[table] || {}])
//     );

//     const payload = {
//       prompt,
//       database_type: selectedDb,
//       tables_or_collections: selectedTables,
//       schema_info: selectedSchema,
//       additional_context: {
//         relationship: 'orders.user_id references users.id',
//       },
//     };

//     try {
//       const result = await executePromptQuery(payload);
//       toast.dismiss();

//       if (result.success) {
//         setResponse(result);
//         toast.success('Query executed successfully');

//         setHistory((prev) => [
//           {
//             prompt,
//             query: result.query,
//             timestamp: result.timestamp,
//             row_count: result.row_count,
//             db: selectedDb,
//             tables: selectedTables,
//           },
//           ...prev.slice(0, 4),
//         ]);
//       } else {
//         toast.error(result.error || 'Query failed');
//       }
//     } catch (err) {
//       toast.dismiss();
//       toast.error('Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-6">Natural Language Query</h1>

//       {/* Database Selection */}
//       <label className="block mb-2 font-medium">Select Database:</label>
//       <select
//         value={selectedDb}
//         onChange={(e) => {
//           setSelectedDb(e.target.value);
//           setSelectedTables([]);
//           setFile(null);
//         }}
//         className="mb-4 p-2 border rounded w-full"
//       >
//         {supportedDatabases.map((db) => (
//           <option key={db.value} value={db.value}>
//             {db.label}
//           </option>
//         ))}
//       </select>

//       {/* File Upload */}
//       {(selectedDb === 'EXCEL' || selectedDb === 'CSV') && (
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Upload File:</label>
//           <input
//             type="file"
//             accept=".xlsx,.xls,.csv"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="p-2 border rounded w-full"
//           />
//           {file && <p className="mt-2 text-sm text-green-600">Uploaded: {file.name}</p>}
//         </div>
//       )}

//       {/* Table Selection */}
//       <label className="block mb-2 font-medium">Select Tables:</label>
//       <div className="mb-4 flex flex-wrap gap-3">
//         {availableTables.map((table) => (
//           <label key={table} className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={selectedTables.includes(table)}
//               onChange={() => handleTableToggle(table)}
//             />
//             {table}
//           </label>
//         ))}
//       </div>

//       {/* Prompt Input */}
//       <label className="block mb-2 font-medium">Enter Prompt:</label>
//       <textarea
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         rows={4}
//         className="mb-4 p-2 border rounded w-full"
//         placeholder="e.g., Show me total orders by user"
//       />

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className={`px-4 py-2 rounded text-white ${
//           loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//         }`}
//       >
//         {loading ? 'Processing...' : 'Execute Prompt'}
//       </button>

//       {/* Query Result */}
//       {response && (
//         <div className="mt-8">
//           <h2 className="font-semibold mb-2">Generated Query:</h2>
//           <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
//             {response.query}
//           </pre>

//           <h2 className="font-semibold mt-4 mb-2">Results:</h2>
//           <table className="w-full border border-collapse">
//             <thead>
//               <tr>
//                 {response.columns.map((col) => (
//                   <th key={col.name} className="border px-3 py-2 bg-gray-200">
//                     {col.name}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {response.data.map((row, idx) => (
//                 <tr key={idx}>
//                   {response.columns.map((col) => (
//                     <td key={col.name} className="border px-3 py-2">
//                       {row[col.name]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Query History */}
//       {history.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-lg font-semibold mb-2">Query History</h2>
//           <ul className="space-y-2 text-sm">
//             {history.map((item, idx) => (
//               <li key={idx} className="p-3 border rounded bg-gray-50">
//                 <p><strong>DB:</strong> {item.db}</p>
//                 <p><strong>Tables:</strong> {item.tables.join(', ')}</p>
//                 <p><strong>Prompt:</strong> {item.prompt}</p>
//                 <p><strong>Rows:</strong> {item.row_count}</p>
//                 <p><strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}</p>
//                 <details className="mt-1">
//                   <summary className="cursor-pointer text-blue-600">View Query</summary>
//                   <pre className="mt-2 bg-gray-100 p-2 rounded whitespace-pre-wrap">{item.query}</pre>
//                 </details>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import toast from 'react-hot-toast';
 import { executePromptQuery } from '../services/dataSourceService';

const supportedDatabases = [
  { label: 'MySQL', value: 'MYSQL' },
  { label: 'PostgreSQL', value: 'POSTGRESQL' },
  { label: 'MongoDB', value: 'MONGODB' },
  { label: 'Excel', value: 'EXCEL' },
  { label: 'CSV', value: 'CSV' },
];

const schemaRegistry = {
  MYSQL: {
    users: { id: 'int', name: 'varchar', email: 'varchar' },
    orders: { id: 'int', user_id: 'int', total: 'decimal', order_date: 'timestamp' },
  },
};

export default function QueryInterface({ theme: themeProp }) {
  const [selectedDb, setSelectedDb] = useState('MYSQL');
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [theme] = useState(themeProp || 'light');

  const isDark = theme === 'dark';

  useEffect(() => {
    document.body.style.background = isDark ? '#000' : '#fff';
  }, [isDark]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        let res;
        if (selectedDb === 'EXCEL' || selectedDb === 'CSV') {
          if (!file) return;
          const formData = new FormData();
          formData.append('databaseType', selectedDb);
          formData.append('file', file);

          res = await axios.post('http://localhost:8084/api/datasource/tables', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else {
          res = await axios.get('http://localhost:8084/api/datasource/tables', {
            params: { databaseType: selectedDb },
          });
        }
        setAvailableTables(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setAvailableTables([]);
      }
    };

    fetchTables();
  }, [selectedDb, file]);

  const handleTableToggle = (table) => {
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
    );
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || selectedTables.length === 0) {
      toast.error('Please enter a prompt and select at least one table.');
      return;
    }

    setLoading(true);
    toast.loading('Running query...');
    setResponse(null);

    const selectedSchema = Object.fromEntries(
      selectedTables.map((table) => [table, schemaRegistry[selectedDb]?.[table] || {}])
    );

    const payload = {
      prompt,
      database_type: selectedDb,
      tables_or_collections: selectedTables,
      schema_info: selectedSchema,
      additional_context: {
        relationship: 'orders.user_id references users.id',
      },
    };

    try {
      const result = await executePromptQuery(payload);
      toast.dismiss();
      if (result.success) {
        setResponse(result);
        toast.success('Query executed successfully');
        setHistory((prev) => [
          {
            prompt,
            query: result.query,
            timestamp: result.timestamp,
            row_count: result.row_count,
            db: selectedDb,
            tables: selectedTables,
          },
          ...prev.slice(0, 4),
        ]);
      } else {
        toast.error(result.error || 'Query failed');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chatinterface-container ${theme}`}
      style={{
        minHeight: '100vh',
        background: isDark ? '#000' : '#fff',
        color: isDark ? '#fff' : '#000',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px'
      }}
    >
      {/* Navbar */}
      <nav
        className={`w-full z-50 h-[56px] shadow-sm transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-[#F8F8F8] text-gray-800"}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between pl-2 pr-2 h-full w-full">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => (window.location.href = "/")}>
            <svg width="32" height="32" viewBox="0 0 200 200">
              <rect x="20" y="20" rx="20" ry="20" width="160" height="140" fill="#9B5BC9" />
              <polygon points="80,160 100,160 90,180" fill="#9B5BC9" />
              <rect x="30" y="40" rx="8" ry="8" width="80" height="20" fill="#D3BDF0" />
              <rect x="90" y="70" rx="8" ry="8" width="80" height="20" fill="#D3BDF0" />
              <rect x="30" y="100" rx="8" ry="8" width="80" height="20" fill="#D3BDF0" />
            </svg>
            <span
              className="text-xl font-bold text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, #B57EDC, #9B5DE5)" }}
            >
              DataLingo
            </span>
          </div>
        </div>
      </nav>

      <style>
        {`
          select:focus option, select:hover option {
            background: inherit;
          }
          .custom-select-dark option:checked,
          .custom-select-dark option:hover,
          .custom-select-dark:focus option:hover {
            background: #D3BDF0 !important;
            color: #181028 !important;
          }
          .custom-select-light option:checked,
          .custom-select-light option:hover,
          .custom-select-light:focus option:hover {
            background: #D3BDF0 !important;
            color: #181028 !important; }
        `}
      </style>


      <div className="max-w-5xl mx-auto p-6 rounded shadow transition-colors duration-300"
        style={{
          background: isDark ? '#000' : '#fff',
          color: isDark ? '#fff' : '#000',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          border: `1.5px solid #9B5DE5`
        }}
      >
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#B57edc" }}>Natural Language Query</h1>

        <label className="block mb-2 font-medium">Select Database:</label>
        <select
          value={selectedDb}
          onChange={(e) => {
            setSelectedDb(e.target.value);
            setSelectedTables([]);
            setFile(null);
          }}
          className="mb-4 p-2 border rounded w-full"
          style={{
            background: isDark ? '#000' : '#fff',
            color: isDark ? '#fff' : '#000',
            borderColor: '#9B5DE5'
          }}
        >
          {supportedDatabases.map((db) => (
            <option key={db.value} value={db.value}>
              {db.label}
            </option>
          ))}
        </select>

        {(selectedDb === 'EXCEL' || selectedDb === 'CSV') && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Upload File:</label>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="p-2 border rounded w-full"
              style={{
                background: isDark ? '#000' : '#fff',
                color: isDark ? '#fff' : '#000',
                borderColor: '#9B5DE5'
              }}
            />
            {file && <p className="mt-2 text-sm text-green-400">Uploaded: {file.name}</p>}
          </div>
        )}

        <label className="block mb-2 font-medium">Select Tables:</label>
        <div className="mb-4 flex flex-wrap gap-3">
          {Array.isArray(availableTables) ? availableTables.map((table) => (
            <label key={table} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTables.includes(table)}
                onChange={() => handleTableToggle(table)}
                style={{
                  accentColor: '#B57edc',
                  borderColor: '#9B5DE5'
                }}
              />
              {table}
            </label>
          )) : null}
        </div>

        <label className="block mb-2 font-medium">Enter Prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="mb-4 p-2 border rounded w-full"
          placeholder="e.g., Show me total orders by user"
          style={{
            background: isDark ? '#000' : '#fff',
            color: isDark ? '#fff' : '#000',
            borderColor: '#9B5DE5'
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded text-white font-semibold`}
          style={{
            background: loading ? '#D3BDF0' : '#b57edc',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Processing...' : 'Execute Prompt'}
        </button>

        {response && (
          <div className="mt-8">
            <h2 className="font-semibold mb-2" style={{ color: '#b57edc' }}>Generated Query:</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap" style={{
              background: isDark ? '#000' : '#f3f3f3',
              color: isDark ? '#fff' : '#000'
            }}>
              {response.query}
            </pre>

            <h2 className="font-semibold mt-4 mb-2" style={{ color: '#B57edc' }}>Results:</h2>
            <table className="w-full border border-collapse" style={{ fontSize: '15px' }}>
              <thead>
                <tr>
                  {response.columns.map((col) => (
                    <th key={col.name} className="border px-3 py-2 bg-gray-200" style={{
                      background: isDark ? '#000' : '#e5e5e5',
                      color: isDark ? '#fff' : '#000'
                    }}>
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {response.data.map((row, idx) => (
                  <tr key={idx}>
                    {response.columns.map((col) => (
                      <td key={col.name} className="border px-3 py-2" style={{
                        color: isDark ? '#fff' : '#000'
                      }}>
                        {row[col.name]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#B57edc' }}>Query History</h2>
            <ul className="space-y-2 text-sm">
              {history.map((item, idx) => (
                <li key={idx} className="p-3 border rounded" style={{
                  background: isDark ? '#000' : '#f3f3f3',
                  color: isDark ? '#fff' : '#000'
                }}>
                  <p><strong>DB:</strong> {item.db}</p>
                  <p><strong>Tables:</strong> {item.tables.join(', ')}</p>
                  <p><strong>Prompt:</strong> {item.prompt}</p>
                  <p><strong>Rows:</strong> {item.row_count}</p>
                  <p><strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}</p>
                  <details className="mt-1">
                    <summary className="cursor-pointer" style={{ color: '#B57edc' }}>View Query</summary>
                    <pre className="mt-2 bg-gray-100 p-2 rounded whitespace-pre-wrap" style={{
                      background: isDark ? '#000' : '#f3f3f3',
                      color: isDark ? '#fff' : '#000'
                    }}>{item.query}</pre>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}