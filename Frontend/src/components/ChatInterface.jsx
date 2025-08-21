// import React, { useState, useRef, useEffect } from 'react';
// import { Search, Database, History, Upload, Settings, Play, Download, Trash2, Eye, EyeOff, Plus, X, CheckCircle, AlertCircle, Clock, BarChart3, PieChart, LineChart, Zap, Users, DollarSign, TrendingUp, Moon, Sun } from 'lucide-react';
// import { uploadFile, getAllFiles, deleteFile } from "../services/fileService";
// import { executePromptQuery } from '../services/dataSourceService';

// const DataLingo = ({ theme = 'light' }) => {
//   const [activeTab, setActiveTab] = useState('query');
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSql, setShowSql] = useState(false);
//   const [selectedConnection, setSelectedConnection] = useState(null);
//   const [showConnectionModal, setShowConnectionModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [files, setFiles] = useState([]);
//   const [uploadMessage, setUploadMessage] = useState("");

//   // ✅ MOVED: All state declarations should be at the top
//   const [connectionForm, setConnectionForm] = useState({
//     name: '',
//     type: 'postgresql',
//     host: '',
//     port: '',
//     database: '',
//     username: '',
//     password: '',
//     ssl: false,
//     connectionString: '',
//     authDatabase: '',
//     charset: 'utf8mb4',
//     connectionTimeout: '30',
//     maxConnections: '10',
//     fileName: '',
//     fileType: '',
//     hasHeaders: true,
//     delimiter: ','
//   });
//   const [testingConnection, setTestingConnection] = useState(false);

//   // Use theme prop instead of internal state
//   const isDark = theme === 'dark';

//   // Dynamic connections state - start with one default connection
//   const [connections, setConnections] = useState([
//     { id: 1, name: 'Demo Database', type: 'postgresql', status: 'connected', host: 'localhost:5432', isDefault: true }
//   ]);

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const data = await getAllFiles();
//       setFiles(data);
//     } catch (err) {
//       console.error("Error fetching files:", err.message);
//     }
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;
//     try {
//       const result = await uploadFile(selectedFile);
//       setUploadMessage(result.message || "File uploaded successfully");
//       fetchFiles(); // refresh list
//     } catch (err) {
//       setUploadMessage(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteFile(id);
//       fetchFiles();
//     } catch (err) {
//       console.error("Delete failed:", err.message);
//     }
//   };

//   // ✅ MOVED: All other functions and constants should be here, before the return
//   const queryHistory = [
//     {
//       id: 1,
//       query: 'Show me the top 10 customers by total revenue this year',
//       sqlGenerated: 'SELECT customer_name, SUM(order_total) as total_revenue FROM orders WHERE YEAR(order_date) = 2024 GROUP BY customer_id, customer_name ORDER BY total_revenue DESC LIMIT 10',
//       timestamp: '2024-08-10 14:30:00',
//       database: 'Sales Database',
//       status: 'success',
//       executionTime: '45ms',
//       rowCount: 10
//     },
//     {
//       id: 2,
//       query: 'Average order value by month for the last 6 months',
//       sqlGenerated: 'SELECT DATE_FORMAT(order_date, "%Y-%m") as month, AVG(order_total) as avg_order_value FROM orders WHERE order_date >= DATE_SUB(NOW(), INTERVAL 6 MONTH) GROUP BY DATE_FORMAT(order_date, "%Y-%m") ORDER BY month',
//       timestamp: '2024-08-10 13:15:00',
//       database: 'Sales Database',
//       status: 'success',
//       executionTime: '23ms',
//       rowCount: 6
//     },
//     {
//       id: 3,
//       query: 'Find all inactive customers from last quarter',
//       sqlGenerated: 'SELECT * FROM customers WHERE last_order_date < DATE_SUB(NOW(), INTERVAL 3 MONTH)',
//       timestamp: '2024-08-10 11:45:00',
//       database: 'Sales Database',
//       status: 'error',
//       executionTime: null,
//       error: 'Column "last_order_date" does not exist'
//     }
//   ];

//   const sampleQueries = [
//     'Show me the top 10 customers by revenue',
//     'What is the average order value by month?',
//     'List all products with low inventory (less than 50 units)',
//     'Find customers who haven\'t ordered in the last 3 months',
//     'Show daily sales trends for the past 30 days'
//   ];

//   const mockResults = {
//     query: 'Show me the top 10 customers by total revenue this year',
//     sqlGenerated: `SELECT 
//   c.customer_name, 
//   SUM(o.order_total) as total_revenue,
//   COUNT(o.order_id) as order_count,
//   AVG(o.order_total) as avg_order_value
// FROM customers c 
// JOIN orders o ON c.customer_id = o.customer_id 
// WHERE YEAR(o.order_date) = 2024 
// GROUP BY c.customer_id, c.customer_name 
// ORDER BY total_revenue DESC 
// LIMIT 10`,
//     columns: ['customer_name', 'total_revenue', 'order_count', 'avg_order_value'],
//     data: [
//       ['Acme Corporation', 125000.50, 45, 2777.79],
//       ['Tech Solutions Inc', 98500.25, 32, 3078.13],
//       ['Global Enterprises Ltd', 87200.00, 28, 3114.29],
//       ['Digital Dynamics LLC', 75600.75, 41, 1843.92],
//       ['Innovation Labs', 68900.00, 25, 2756.00],
//       ['Future Systems Co', 62300.50, 38, 1639.49],
//       ['Smart Solutions Group', 58700.25, 22, 2668.19],
//       ['Elite Services Inc', 54200.00, 31, 1748.39],
//       ['Premier Group Ltd', 49800.75, 19, 2621.09],
//       ['Advanced Tech Corp', 45600.00, 27, 1688.89]
//     ],
//     totalRows: 10,
//     executionTime: '45ms',
//     timestamp: new Date().toLocaleString()
//   };

//   const executeQuery = async () => {
//     if (!query.trim()) return;

//     // Check if a database is selected
//     if (!selectedConnection) {
//       alert('Please select a database connection first');
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     setResults(mockResults);
//     setIsLoading(false);
//   };

//   // Function to add new connection
//   const addConnection = (newConnectionData) => {
//     const newConnection = {
//       id: connections.length + 1,
//       name: newConnectionData.name,
//       type: newConnectionData.type,
//       status: 'connected',
//       host: newConnectionData.host || 'N/A',
//       isDefault: false
//     };

//     setConnections(prev => [...prev, newConnection]);
//     setSelectedConnection(newConnection); // Auto-select the newly added connection
//     setShowConnectionModal(false);

//     // Reset form
//     setConnectionForm({
//       name: '',
//       type: 'postgresql',
//       host: '',
//       port: '',
//       database: '',
//       username: '',
//       password: '',
//       ssl: false,
//       connectionString: '',
//       authDatabase: '',
//       charset: 'utf8mb4',
//       connectionTimeout: '30',
//       maxConnections: '10',
//       fileName: '',
//       fileType: '',
//       hasHeaders: true,
//       delimiter: ','
//     });
//   };

//   // Function to handle form submission
//   const handleConnectionSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!connectionForm.name.trim()) {
//       alert('Please enter a connection name');
//       return;
//     }

//     if (connectionForm.type !== 'file' && connectionForm.type !== 'mongodb') {
//       if (!connectionForm.host.trim() || !connectionForm.database.trim() || !connectionForm.username.trim()) {
//         alert('Please fill in all required fields');
//         return;
//       }
//     }

//     if (connectionForm.type === 'mongodb' && !connectionForm.connectionString.trim()) {
//       alert('Please enter a MongoDB connection string');
//       return;
//     }

//     if (connectionForm.type === 'file' && !connectionForm.fileType) {
//       alert('Please select a file type');
//       return;
//     }

//     // Add the new connection
//     addConnection(connectionForm);
//   };

//   // Function to handle dropdown change
//   const handleConnectionChange = (e) => {
//     const connectionId = parseInt(e.target.value);
//     if (connectionId) {
//       const connection = connections.find(c => c.id === connectionId);
//       setSelectedConnection(connection);
//     } else {
//       setSelectedConnection(null);
//     }
//   };

//   const DatabaseIcon = ({ type }) => {
//     const iconProps = { size: 16, className: "mr-2 text-purple-400" };
//     switch (type) {
//       case 'postgresql': return <Database {...iconProps} />;
//       case 'mysql': return <Database {...iconProps} />;
//       case 'mongodb': return <Database {...iconProps} />;
//       default: return <Database {...iconProps} />;
//     }
//   };

//   const StatusBadge = ({ status }) => {
//     const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";

//     switch (status) {
//       case 'connected':
//         return <span className={`${baseClasses} bg-green-100 text-green-800`}>Connected</span>;
//       case 'connecting':
//         return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Connecting...</span>;
//       case 'processed':
//         return <span className={`${baseClasses} bg-green-100 text-green-800`}>Processed</span>;
//       case 'processing':
//         return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>Processing...</span>;
//       case 'error':
//         return <span className={`${baseClasses} bg-red-100 text-red-800`}>Error</span>;
//       default:
//         return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Unknown</span>;
//     }
//   };
//   const ChatInterface = ({ selectedDataSourceId }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const handleSend = async () => {
//     const userMessage = { sender: 'user', text: input };
//     setMessages(prev => [...prev, userMessage]);

//     const response = await executePromptQuery(input, selectedDataSourceId);
//     const botMessage = {
//       sender: 'bot',
//       text: response.output || 'No response received.'
//     };

//     setMessages(prev => [...prev, botMessage]);
//     setInput('');
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-window">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <input
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         placeholder="Ask your data..."
//       />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// };


  

//   // ✅ MAIN RETURN: This should be the ONLY return statement
//   return (
//     <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}>
//       {/* Header */}
//       <nav
//         className="w-full z-50 h-[56px] shadow-sm transition-colors duration-300"
//         style={{
//           backgroundColor: isDark ? '#000000' : '#F8F8F8',
//           borderBottomColor: '#e5e7eb',
//           borderBottomWidth: '1px',
//           borderBottomStyle: 'solid',
//           color: isDark ? '#ffffff' : '#000000'
//         }}
//       >
//         <div className="max-w-6xl mx-auto flex items-center justify-between pl-2 pr-2 h-full w-full">
//           <div
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => (window.location.href = "/")}
//           >
//             <svg
//               width="32"
//               height="32"
//               viewBox="0 0 200 200"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="xMidYMid meet"
//             >
//               <rect x="20" y="20" rx="20" ry="20" width="160" height="140" fill="#9B5BC9" />
//               <polygon points="80,160 100,160 90,180" fill="#9B5BC9" />
//               <rect x="30" y="40" rx="8" ry="8" width="80" height="20" fill="#D3BDF0" />
//               <rect x="90" y="70" rx="8" ry="8" width="80" height="20" fill="#D3BDF0" />
//               <rect x="30" y="100" rx="8" ry="8" width="80" height="20" fill="#D3BDF0" />
//             </svg>
//             <span
//               className="text-xl font-bold text-transparent bg-clip-text"
//               style={{ backgroundImage: "linear-gradient(to right, #B57EDC, #9B5DE5)" }}
//             >
//               DataLingo
//             </span>
//           </div>
//           <div className="flex items-center space-x-2 ml-auto">
//             {/* Dynamic Database Dropdown */}
//             <select
//               className="border rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 shadow-md"
//               style={{
//                 borderColor: '#9B5BC9',
//                 backgroundColor: isDark ? '#000000' : '#ffffff',
//                 color: selectedConnection ? (isDark ? '#ffffff' : '#000000') : '#9ca3af'
//               }}
//               value={selectedConnection ? selectedConnection.id : ''}
//               onChange={handleConnectionChange}
//             >
//               <option value="" disabled style={{
//                 backgroundColor: isDark ? '#000000' : '#ffffff',
//                 color: '#9ca3af'
//               }}>
//                 Select Database
//               </option>
//               {connections.map(conn => (
//                 <option
//                   key={conn.id}
//                   value={conn.id}
//                   style={{
//                     backgroundColor: isDark ? '#000000' : '#ffffff',
//                     color: isDark ? '#ffffff' : '#000000'
//                   }}
//                 >
//                   {conn.name} {conn.isDefault ? '(Default)' : ''}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Navigation Tabs */}
//         <div className="border-b mb-6" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
//           <nav className="-mb-px flex space-x-8">
//             {[
//               { id: 'query', label: 'Query Builder', icon: Search },
//               { id: 'history', label: 'History', icon: History },
//               { id: 'connections', label: 'Connections', icon: Database },
//               { id: 'files', label: 'File Upload', icon: Upload }
//             ].map(tab => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === tab.id
//                   ? 'border-purple-500'
//                   : 'border-transparent hover:border-gray-300'
//                   }`}
//                 style={{
//                   color: activeTab === tab.id ? '#B57edc' : (isDark ? '#ffffff' : '#000000'),
//                   borderBottomColor: activeTab === tab.id ? '#B57edc' : 'transparent'
//                 }}
//               >
//                 <tab.icon size={16} className="mr-2" />
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Query Builder Tab */}
//         {activeTab === 'query' && (
//           <div className="space-y-6">
//             {/* Query Input Section */}
//             <div className="rounded-lg shadow-sm border p-6" style={{
//               borderColor: isDark ? '#374151' : '#e5e7eb',
//               backgroundColor: isDark ? '#111111' : '#ffffff'
//             }}>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold" style={{ color: '#B57edc' }}>Natural Language Query</h2>
//                 <div className="flex items-center space-x-2 text-sm" style={{ color: isDark ? '#ffffff' : '#000000' }}>
//                   {selectedConnection ? (
//                     <>
//                       <DatabaseIcon type={selectedConnection.type} />
//                       <span>{selectedConnection.name}</span>
//                     </>
//                   ) : (
//                     <span style={{ color: '#9ca3af' }}>No database selected</span>
//                   )}
//                 </div>
//               </div>

//               {/* No database selected warning */}
//               {!selectedConnection && (
//                 <div className="mb-4 p-3 rounded-lg" style={{
//                   backgroundColor: isDark ? '#451515' : '#fee2e2',
//                   borderColor: '#ef4444',
//                   borderWidth: '1px'
//                 }}>
//                   <p className="text-sm text-red-600 flex items-center">
//                     <AlertCircle size={16} className="mr-2" />
//                     Please select a database connection from the dropdown above to start querying.
//                   </p>
//                 </div>
//               )}

//               <div className="space-y-4">
//                 <div className="relative">
//                   <textarea
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder={selectedConnection
//                       ? "Ask anything about your data... e.g., 'Show me the top 10 customers by revenue this year'"
//                       : "Please select a database first to start querying..."
//                     }
//                     disabled={!selectedConnection}
//                     className="w-full p-4 border rounded-lg resize-none h-24 focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                     style={{
//                       borderColor: '#9B5BC9',
//                       backgroundColor: isDark ? '#1f2937' : '#ffffff',
//                       color: isDark ? '#ffffff' : '#000000'
//                     }}
//                   />
//                   <button
//                     onClick={executeQuery}
//                     disabled={!query.trim() || isLoading || !selectedConnection}
//                     className="absolute bottom-3 right-3 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all"
//                     style={{ backgroundColor: '#b57edc' }}
//                   >
//                     {isLoading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <Play size={16} className="mr-2" />
//                         Execute Query
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 {/* Sample Queries */}
//                 {selectedConnection && (
//                   <div>
//                     <p className="text-sm mb-2" style={{ color: isDark ? '#d1d5db' : '#374151' }}>Try these examples:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {sampleQueries.map((sample, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setQuery(sample)}
//                           className="text-sm px-3 py-1 rounded-full transition-colors"
//                           style={{
//                             backgroundColor: isDark ? '#374151' : '#f3f4f6',
//                             color: isDark ? '#ffffff' : '#000000',
//                           }}
//                         >
//                           {sample}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Results Section */}
//             {results && (
//               <div className="rounded-lg shadow-sm border" style={{
//                 borderColor: isDark ? '#374151' : '#e5e7eb',
//                 backgroundColor: isDark ? '#111111' : '#ffffff'
//               }}>
//                 {/* Results content here - truncated for brevity */}
//                 <div className="p-6">
//                   <h3 className="text-lg font-semibold" style={{ color: '#B57edc' }}>Query Results</h3>
//                   <p>Results would be displayed here...</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* File Upload Tab with integrated file management */}
//         {activeTab === 'files' && (
//           <div className="space-y-6">
//             {/* File Upload Section */}
//             <div className="rounded-lg shadow-sm border p-6" style={{
//               borderColor: isDark ? '#374151' : '#e5e7eb',
//               backgroundColor: isDark ? '#111111' : '#ffffff'
//             }}>
//               <h2 className="text-lg font-semibold mb-4" style={{ color: '#B57edc' }}>Upload Files</h2>
              
//               <div className="space-y-4">
//                 <input 
//                   type="file" 
//                   onChange={handleFileChange}
//                   className="w-full p-3 border rounded-lg"
//                   style={{
//                     borderColor: '#9B5BC9',
//                     backgroundColor: isDark ? '#1f2937' : '#ffffff',
//                     color: isDark ? '#ffffff' : '#000000'
//                   }}
//                 />
//                 <button 
//                   onClick={handleUpload}
//                   disabled={!selectedFile}
//                   className="px-6 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
//                   style={{ backgroundColor: '#b57edc' }}
//                 >
//                   Upload File
//                 </button>
//                 {uploadMessage && (
//                   <p className="text-sm" style={{ color: isDark ? '#ffffff' : '#000000' }}>
//                     {uploadMessage}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Processed Files List */}
//             <div className="rounded-lg shadow-sm border p-6" style={{
//               borderColor: isDark ? '#374151' : '#e5e7eb',
//               backgroundColor: isDark ? '#111111' : '#ffffff'
//             }}>
//               <h3 className="text-lg font-semibold mb-4" style={{ color: '#B57edc' }}>Processed Files</h3>
              
//               {files.length === 0 ? (
//                 <p className="text-center py-8" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
//                   No files uploaded yet. Upload a file to get started.
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {files.map((file) => (
//                     <div key={file.id} className="flex items-center justify-between p-3 rounded-lg" style={{
//                       backgroundColor: isDark ? '#1f2937' : '#f9fafb'
//                     }}>
//                       <span style={{ color: isDark ? '#ffffff' : '#000000' }}>{file.name}</span>
//                       <button 
//                         onClick={() => handleDelete(file.id)}
//                         className="text-red-600 hover:text-red-800 transition-colors"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Other tabs content would go here - History, Connections, etc. */}
//         {/* Truncated for brevity, but structure remains the same */}
        
//       </div>
//     </div>
//   );
// };

// export default DataLingo;
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
