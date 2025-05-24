// import React, { useState, useEffect } from 'react';

// const GitHubContributionGraph = () => {
//   const [contributionCount, setContributionCount] = useState(0);
//   const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
//   const [isDark, setIsDark] = useState(true);

//   // Letter patterns (various widths for proper letter formation)
//   const patterns = {
//     'A': [
//       [0,1,0],
//       [1,0,1],
//       [1,0,1],
//       [1,1,1],
//       [1,0,1],
//       [1,0,1],
//       [1,0,1]
//     ],
//     'D': [
//       [1,1,0],
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [1,1,0]
//     ],
//     'I': [
//       [1,1,1],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0],
//       [1,1,1]
//     ],
//     'T': [
//       [1,1,1],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0]
//     ],
//     'Y': [
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0],
//       [0,1,0]
//     ],
//     'K': [
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [1,1,0],
//       [1,1,0],
//       [1,0,1],
//       [1,0,1]
//     ],
//     'R': [
//       [1,1,0],
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [1,1,0],
//       [1,0,1],
//       [1,0,1]
//     ],
//     'G': [
//       [0,1,1,1],
//       [1,0,0,0],
//       [1,0,0,0],
//       [1,0,1,1],
//       [1,0,0,1],
//       [1,0,0,1],
//       [0,1,1,0]
//     ],
//     'O': [
//       [0,1,0],
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [1,0,1],
//       [0,1,0]
//     ],
//     'L': [
//       [1,0,0],
//       [1,0,0],
//       [1,0,0],
//       [1,0,0],
//       [1,0,0],
//       [1,0,0],
//       [1,1,1]
//     ],
//     '.': [
//       [0,0],
//       [0,0],
//       [0,0],
//       [0,0],
//       [0,0],
//       [1,1],
//       [1,1]
//     ],
//     ' ': [
//       [0],
//       [0],
//       [0],
//       [0],
//       [0],
//       [0],
//       [0]
//     ]
//   };

//   const generateContributionData = () => {
//     const text = 'ADITYA KR. GOYAL';
//     const totalWeeks = 68;
    
//     // Calculate total width needed with proper spacing
//     let totalWidth = 0;
//     for (let i = 0; i < text.length; i++) {
//       const char = text[i];
//       const pattern = patterns[char] || patterns[' '];
//       totalWidth += pattern[0].length;
//       if (i < text.length - 1) {
//         totalWidth += 1;
//       }
//     }
    
//     // Build the pattern with proper spacing
//     const finalPattern = Array(7).fill().map(() => Array(totalWeeks).fill(0));
    
//     // Center the text in the available space
//     let startCol = Math.floor((totalWeeks - totalWidth) / 2);
//     let currentCol = startCol;
    
//     // Track letter boundaries to avoid random dots in letter areas
//     const letterBounds = [];
    
//     for (let i = 0; i < text.length; i++) {
//       const char = text[i];
//       const pattern = patterns[char] || patterns[' '];
      
//       // Record letter boundaries
//       letterBounds.push({
//         start: currentCol,
//         end: currentCol + pattern[0].length - 1
//       });
      
//       // Place the letter
//       for (let col = 0; col < pattern[0].length; col++) {
//         for (let row = 0; row < 7; row++) {
//           if (currentCol + col < totalWeeks) {
//             finalPattern[row][currentCol + col] = pattern[row][col];
//           }
//         }
//       }
      
//       currentCol += pattern[0].length;
      
//       if (i < text.length - 1) {
//         currentCol += 1;
//       }
//     }
    
//     // Function to check if a position is within any letter boundary
//     function isInLetterArea(col) {
//       return letterBounds.some(bound => col >= bound.start && col <= bound.end);
//     }
    
//     let totalContributions = 0;
//     const contributionData = [];
    
//     // Generate the graph data
//     for (let week = 0; week < totalWeeks; week++) {
//       const weekData = [];
      
//       for (let day = 0; day < 7; day++) {
//         let level = 0;
        
//         // Check if this position has a contribution in our pattern
//         if (finalPattern[day][week] === 1) {
//           // Random level for letter pixels - mostly bright green with some variation
//           const rand = Math.random();
//           if (rand < 0.7) {
//             level = 4; // Bright green (70%)
//           } else if (rand < 0.9) {
//             level = 3; // Medium-bright green (20%)
//           } else {
//             level = 2; // Medium green (10%)
//           }
//           totalContributions += level;
//         } else {
//           // Add random background dots only outside letter areas
//           if (!isInLetterArea(week) && Math.random() < 0.02) {
//             level = Math.random() < 0.8 ? 1 : 2;
//             totalContributions += level;
//           }
//         }
        
//         // Create date
//         const startDate = new Date('2024-01-01');
//         const currentDate = new Date(startDate);
//         currentDate.setDate(startDate.getDate() + (week * 7) + day);
        
//         weekData.push({
//           level,
//           date: currentDate.toISOString().split('T')[0]
//         });
//       }
      
//       contributionData.push(weekData);
//     }
    
//     setContributionCount(totalContributions);
//     return contributionData;
//   };

//   const [contributionData, setContributionData] = useState([]);

//   useEffect(() => {
//     setContributionData(generateContributionData());
//   }, []);

//   const showTooltip = (event, date, level) => {
//     const dateObj = new Date(date);
//     const contributionText = level === 0 ? 'No contributions' : 
//                            level === 1 ? '1-3 contributions' :
//                            level === 2 ? '4-6 contributions' :
//                            level === 3 ? '7-9 contributions' : '10+ contributions';
    
//     const dateStr = dateObj.toLocaleDateString('en-US', { 
//       weekday: 'long', 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
    
//     const rect = event.target.getBoundingClientRect();
//     setTooltip({
//       show: true,
//       content: `${contributionText} on ${dateStr}`,
//       x: event.pageX,
//       y: event.pageY
//     });
//   };

//   const hideTooltip = () => {
//     setTooltip({ show: false, content: '', x: 0, y: 0 });
//   };

//   const getLevelColor = (level) => {
//     if (isDark) {
//       switch(level) {
//         case 0: return 'bg-gray-900 border border-gray-800 border-opacity-10';
//         case 1: return 'bg-green-900';
//         case 2: return 'bg-green-700';
//         case 3: return 'bg-green-500';
//         case 4: return 'bg-green-400';
//         default: return 'bg-gray-900 border border-gray-800 border-opacity-10';
//       }
//     } else {
//       switch(level) {
//         case 0: return 'bg-gray-100 border border-gray-300';
//         case 1: return 'bg-green-100';
//         case 2: return 'bg-green-200';
//         case 3: return 'bg-green-400';
//         case 4: return 'bg-green-600';
//         default: return 'bg-gray-100 border border-gray-300';
//       }
//     }
//   };

//   const getLegendColor = (level) => {
//     if (isDark) {
//       switch(level) {
//         case 0: return 'bg-gray-900 border border-gray-800 border-opacity-10';
//         case 1: return 'bg-green-900';
//         case 2: return 'bg-green-700';
//         case 3: return 'bg-green-500';
//         case 4: return 'bg-green-400';
//         default: return 'bg-gray-900 border border-gray-800 border-opacity-10';
//       }
//     } else {
//       switch(level) {
//         case 0: return 'bg-gray-100 border border-gray-300';
//         case 1: return 'bg-green-100';
//         case 2: return 'bg-green-200';
//         case 3: return 'bg-green-400';
//         case 4: return 'bg-green-600';
//         default: return 'bg-gray-100 border border-gray-300';
//       }
//     }
//   };

//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const days = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

//   const themeClasses = isDark
//     ? 'bg-gray-950 text-gray-100'
//     : 'bg-gray-50 text-gray-900';

//   const containerClasses = isDark
//     ? 'border-gray-700 bg-gray-900'
//     : 'border-gray-300 bg-white';

//   const textClasses = isDark
//     ? 'text-gray-200'
//     : 'text-gray-700';

//   const mutedTextClasses = isDark
//     ? 'text-gray-500'
//     : 'text-gray-600';

//   const linkClasses = isDark
//     ? 'text-gray-500 hover:text-blue-400'
//     : 'text-gray-600 hover:text-blue-600';

//   const tooltipClasses = isDark
//     ? 'bg-gray-800 text-gray-200 border-gray-600'
//     : 'bg-white text-gray-800 border-gray-300 shadow-lg';

//   const tooltipArrowClasses = isDark
//     ? 'border-t-gray-800'
//     : 'border-t-white';

//   return (
//     <div className={`min-h-screen font-sans transition-colors duration-300 ${themeClasses}`}>
//       <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
//         {/* Theme Toggle */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => setIsDark(!isDark)}
//             className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
//               isDark 
//                 ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
//                 : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//             }`}
//           >
//             {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
//           </button>
//         </div>

//         <div className="flex items-center justify-between mb-6">
//           <h2 className={`text-lg font-semibold m-0 ${textClasses}`}>Contribution Graph</h2>
//           <div className="flex items-center gap-4">
//             <a href="#" className={`no-underline text-sm ${linkClasses}`}>
//               Contribution settings
//             </a>
//           </div>
//         </div>
        
//         <div className={`border rounded-lg p-6 transition-colors duration-300 ${containerClasses}`}>
//           <div className="flex items-baseline justify-between mb-4">
//             <div className={`text-sm font-normal ${textClasses}`}>
//               <strong className="font-semibold">{contributionCount}</strong> contributions in the last year
//             </div>
//             <a href="#" className={`no-underline text-sm hover:underline ${linkClasses}`}>
//               2024
//             </a>
//           </div>
          
//           <div className="relative">
//             {/* Months row */}
//             <div className="grid grid-cols-12 gap-0 mb-2 ml-10 pr-6">
//               {months.map((month, index) => (
//                 <div key={index} className={`text-xs ${mutedTextClasses}`}>
//                   {month}
//                 </div>
//               ))}
//             </div>
            
//             {/* Graph main */}
//             <div className="flex">
//               {/* Days column */}
//               <div className="flex flex-col mr-2 w-8">
//                 {days.map((day, index) => (
//                   <div key={index} className={`h-3 text-xs flex items-center mb-0.5 leading-none ${mutedTextClasses}`}>
//                     {day}
//                   </div>
//                 ))}
//               </div>
              
//               {/* Graph columns - Fully responsive without scrollbar */}
//               <div className="grid gap-0.5 flex-1" style={{ gridTemplateColumns: `repeat(${contributionData.length}, minmax(0, 1fr))` }}>
//                 {contributionData.map((week, weekIndex) => (
//                   <div key={weekIndex} className="flex flex-col gap-0.5">
//                     {week.map((day, dayIndex) => (
//                       <div
//                         key={dayIndex}
//                         className={`w-full h-3 rounded-sm cursor-pointer relative transition-all duration-200 hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 ${getLevelColor(day.level)}`}
//                         style={{ aspectRatio: '1' }}
//                         onMouseEnter={(e) => showTooltip(e, day.date, day.level)}
//                         onMouseLeave={hideTooltip}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Graph footer */}
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4">
//               <a href="#" className={`text-xs no-underline hover:underline ${linkClasses}`}>
//                 Learn how we count contributions
//               </a>
              
//               <div className="flex items-center gap-1">
//                 <span className={`mr-1 text-xs ${mutedTextClasses}`}>Less</span>
//                 {[0, 1, 2, 3, 4].map((level) => (
//                   <div key={level} className={`w-3 h-3 rounded-sm ${getLegendColor(level)}`} />
//                 ))}
//                 <span className={`ml-1 text-xs ${mutedTextClasses}`}>More</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Tooltip */}
//       {tooltip.show && (
//         <div 
//           className={`absolute px-3 py-2 rounded-md text-xs whitespace-nowrap z-50 pointer-events-none opacity-100 transition-all duration-200 ${tooltipClasses}`}
//           style={{
//             left: `${tooltip.x - 50}px`,
//             top: `${tooltip.y - 50}px`,
//             transform: 'translateX(-50%)'
//           }}
//         >
//           {tooltip.content}
//           <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${tooltipArrowClasses}`} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default GitHubContributionGraph;


import React, { useState, useEffect, useRef } from 'react';

const GitHubContributionGraph = () => {
  const [contributionCount, setContributionCount] = useState(0);
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  const [isDark, setIsDark] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeYear, setActiveYear] = useState('2024');
  const graphRef = useRef(null);

  // Letter patterns (various widths for proper letter formation)
  const patterns = {
    'A': [
      [0,1,0],
      [1,0,1],
      [1,0,1],
      [1,1,1],
      [1,0,1],
      [1,0,1],
      [1,0,1]
    ],
    'D': [
      [1,1,0],
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [1,1,0]
    ],
    'I': [
      [1,1,1],
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [1,1,1]
    ],
    'T': [
      [1,1,1],
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [0,1,0]
    ],
    'Y': [
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [0,1,0]
    ],
    'K': [
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [1,1,0],
      [1,1,0],
      [1,0,1],
      [1,0,1]
    ],
    'R': [
      [1,1,0],
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [1,1,0],
      [1,0,1],
      [1,0,1]
    ],
    'G': [
      [0,1,1,1],
      [1,0,0,0],
      [1,0,0,0],
      [1,0,1,1],
      [1,0,0,1],
      [1,0,0,1],
      [0,1,1,0]
    ],
    'O': [
      [0,1,0],
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [1,0,1],
      [0,1,0]
    ],
    'L': [
      [1,0,0],
      [1,0,0],
      [1,0,0],
      [1,0,0],
      [1,0,0],
      [1,0,0],
      [1,1,1]
    ],
    '.': [
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [1,1],
      [1,1]
    ],
    ' ': [
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0]
    ]
  };

  const generateContributionData = () => {
    const text = 'ADITYA KR. GOYAL';
    const totalWeeks = 68;
    
    // Calculate total width needed with proper spacing
    let totalWidth = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const pattern = patterns[char] || patterns[' '];
      totalWidth += pattern[0].length;
      if (i < text.length - 1) {
        totalWidth += 1;
      }
    }
    
    // Build the pattern with proper spacing
    const finalPattern = Array(7).fill().map(() => Array(totalWeeks).fill(0));
    
    // Center the text in the available space
    let startCol = Math.floor((totalWeeks - totalWidth) / 2);
    let currentCol = startCol;
    
    // Track letter boundaries to avoid random dots in letter areas
    const letterBounds = [];
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const pattern = patterns[char] || patterns[' '];
      
      // Record letter boundaries
      letterBounds.push({
        start: currentCol,
        end: currentCol + pattern[0].length - 1
      });
      
      // Place the letter
      for (let col = 0; col < pattern[0].length; col++) {
        for (let row = 0; row < 7; row++) {
          if (currentCol + col < totalWeeks) {
            finalPattern[row][currentCol + col] = pattern[row][col];
          }
        }
      }
      
      currentCol += pattern[0].length;
      
      if (i < text.length - 1) {
        currentCol += 1;
      }
    }
    
    // Function to check if a position is within any letter boundary
    function isInLetterArea(col) {
      return letterBounds.some(bound => col >= bound.start && col <= bound.end);
    }
    
    let totalContributions = 0;
    const contributionData = [];
    
    // Generate the graph data
    for (let week = 0; week < totalWeeks; week++) {
      const weekData = [];
      
      for (let day = 0; day < 7; day++) {
        let level = 0;
        
        // Check if this position has a contribution in our pattern
        if (finalPattern[day][week] === 1) {
          // Random level for letter pixels - mostly bright green with some variation
          const rand = Math.random();
          if (rand < 0.7) {
            level = 4; // Bright green (70%)
          } else if (rand < 0.9) {
            level = 3; // Medium-bright green (20%)
          } else {
            level = 2; // Medium green (10%)
          }
          totalContributions += level;
        } else {
          // Add random background dots only outside letter areas
          if (!isInLetterArea(week) && Math.random() < 0.02) {
            level = Math.random() < 0.8 ? 1 : 2;
            totalContributions += level;
          }
        }
        
        // Create date
        const startDate = new Date('2024-01-01');
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (week * 7) + day);
        
        weekData.push({
          level,
          date: currentDate.toISOString().split('T')[0],
          week,
          day
        });
      }
      
      contributionData.push(weekData);
    }
    
    setContributionCount(totalContributions);
    return contributionData;
  };

  const [contributionData, setContributionData] = useState([]);

  useEffect(() => {
    setContributionData(generateContributionData());
  }, []);

  const showTooltip = (event, date, level) => {
    const dateObj = new Date(date);
    const contributionText = level === 0 ? 'No contributions' : 
                           level === 1 ? '1-3 contributions' :
                           level === 2 ? '4-6 contributions' :
                           level === 3 ? '7-9 contributions' : '10+ contributions';
    
    const dateStr = dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const rect = event.target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    setTooltip({
      show: true,
      content: `${contributionText} on ${dateStr}`,
      x: rect.left + scrollLeft + rect.width / 2,
      y: rect.top + scrollTop - 10
    });
  };

  const hideTooltip = () => {
    setTooltip({ show: false, content: '', x: 0, y: 0 });
  };

  const handleCellClick = (week, day, level, date) => {
    setSelectedCell({ week, day, level, date });
  };

  const getLevelColor = (level, isSelected = false, isHovered = false) => {
    const baseClasses = isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : '';
    const hoverClasses = isHovered ? 'transform scale-110 z-10 relative' : '';
    
    if (isDark) {
      switch(level) {
        case 0: return `bg-gray-900 border border-gray-800 border-opacity-10 ${baseClasses} ${hoverClasses}`;
        case 1: return `bg-green-900 ${baseClasses} ${hoverClasses}`;
        case 2: return `bg-green-700 ${baseClasses} ${hoverClasses}`;
        case 3: return `bg-green-500 ${baseClasses} ${hoverClasses}`;
        case 4: return `bg-green-400 ${baseClasses} ${hoverClasses}`;
        default: return `bg-gray-900 border border-gray-800 border-opacity-10 ${baseClasses} ${hoverClasses}`;
      }
    } else {
      switch(level) {
        case 0: return `bg-gray-100 border border-gray-300 ${baseClasses} ${hoverClasses}`;
        case 1: return `bg-green-100 ${baseClasses} ${hoverClasses}`;
        case 2: return `bg-green-200 ${baseClasses} ${hoverClasses}`;
        case 3: return `bg-green-400 ${baseClasses} ${hoverClasses}`;
        case 4: return `bg-green-600 ${baseClasses} ${hoverClasses}`;
        default: return `bg-gray-100 border border-gray-300 ${baseClasses} ${hoverClasses}`;
      }
    }
  };

  const getLegendColor = (level) => {
    if (isDark) {
      switch(level) {
        case 0: return 'bg-gray-900 border border-gray-800 border-opacity-10';
        case 1: return 'bg-green-900';
        case 2: return 'bg-green-700';
        case 3: return 'bg-green-500';
        case 4: return 'bg-green-400';
        default: return 'bg-gray-900 border border-gray-800 border-opacity-10';
      }
    } else {
      switch(level) {
        case 0: return 'bg-gray-100 border border-gray-300';
        case 1: return 'bg-green-100';
        case 2: return 'bg-green-200';
        case 3: return 'bg-green-400';
        case 4: return 'bg-green-600';
        default: return 'bg-gray-100 border border-gray-300';
      }
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  const daysMobile = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const themeClasses = isDark
    ? 'bg-gray-950 text-gray-100'
    : 'bg-gray-50 text-gray-900';

  const containerClasses = isDark
    ? 'border-gray-700 bg-gray-900'
    : 'border-gray-300 bg-white';

  const textClasses = isDark
    ? 'text-gray-200'
    : 'text-gray-700';

  const mutedTextClasses = isDark
    ? 'text-gray-500'
    : 'text-gray-600';

  const linkClasses = isDark
    ? 'text-gray-500 hover:text-blue-400'
    : 'text-gray-600 hover:text-blue-600';

  const tooltipClasses = isDark
    ? 'bg-gray-800 text-gray-200 border-gray-600'
    : 'bg-white text-gray-800 border-gray-300 shadow-lg';

  const tooltipArrowClasses = isDark
    ? 'border-t-gray-800'
    : 'border-t-white';

  // Get window size for responsive behavior
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${themeClasses}`}>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 lg:px-8 max-w-7xl">
        {/* Header with theme toggle and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className={`text-xl sm:text-2xl font-bold ${textClasses}`}>
              GitHub Activity
            </h1>
            {!isMobile && (
              <select 
                value={activeYear} 
                onChange={(e) => setActiveYear(e.target.value)}
                className={`px-2  cursor-pointer py-1 rounded text-sm border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600 text-gray-200' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option value="2024">2024</option>

              </select>
            )}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {isMobile && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 text-sm flex-1 sm:flex-none ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {isExpanded ? '📱 Compact' : '🔍 Expand'}
              </button>
            )}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-3 py-2 rounded-lg max-w-28 cursor-pointer transition-colors duration-200 text-sm flex-1 sm:flex-none ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {isDark ? '🌞 Light' : '🌙 Dark'}
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className={`flex flex-wrap items-center justify-between mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${containerClasses} border`}>
          <div className={`text-sm font-normal ${textClasses} mb-2 sm:mb-0`}>
            <strong className="font-semibold text-lg sm:text-xl">{contributionCount}</strong> contributions in {activeYear}
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span className={mutedTextClasses}>Longest streak: 12 days</span>
            <span className={mutedTextClasses}>Current streak: 3 days</span>
          </div>
        </div>
        
        <div className={`border rounded-lg p-3 sm:p-6 transition-colors duration-300 ${containerClasses} overflow-hidden`}>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className={`text-base sm:text-lg font-semibold m-0 ${textClasses}`}>
              Contribution Graph
            </h2>
            <a href="https://github.com/" className={`no-underline text-xs sm:text-sm hover:underline ${linkClasses}`}>
              {activeYear}
            </a>
          </div>
          
          <div className="relative" ref={graphRef}>
            {/* Mobile/Tablet optimized layout */}
            {(isMobile || isTablet) && isExpanded ? (
              <div className="space-y-4">
                {/* Expanded mobile view */}
                <div className="overflow-x-auto">
                  <div className="min-w-full" style={{ width: `${contributionData.length * 12}px` }}>
                    {/* Months row */}
                    <div className="flex mb-2 ml-8">
                      {months.map((month, index) => (
                        <div key={index} className={`text-xs flex-1 min-w-0 ${mutedTextClasses}`} style={{ width: `${Math.floor(contributionData.length / 12)}px` }}>
                          {month}
                        </div>
                      ))}
                    </div>
                    
                    {/* Graph main */}
                    <div className="flex">
                      {/* Days column */}
                      <div className="flex flex-col mr-2 w-6">
                        {daysMobile.map((day, index) => (
                          <div key={index} className={`h-3 text-xs flex items-center mb-0.5 ${mutedTextClasses}`}>
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Graph columns */}
                      <div className="flex gap-0.5">
                        {contributionData.map((week, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-0.5">
                            {week.map((day, dayIndex) => {
                              const isSelected = selectedCell && selectedCell.week === weekIndex && selectedCell.day === dayIndex;
                              return (
                                <div
                                  key={dayIndex}
                                  className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-125 ${getLevelColor(day.level, isSelected)}`}
                                  onClick={() => handleCellClick(weekIndex, dayIndex, day.level, day.date)}
                                  onMouseEnter={(e) => showTooltip(e, day.date, day.level)}
                                  onMouseLeave={hideTooltip}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard responsive layout */
              <div>
                {/* Months row - hidden on very small screens in compact mode */}
                {!isMobile && (
                  <div className="grid grid-cols-12 gap-0 mb-2 ml-6 sm:ml-10 pr-2 sm:pr-6">
                    {months.map((month, index) => (
                      <div key={index} className={`text-xs ${mutedTextClasses}`}>
                        {month}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Graph main */}
                <div className="flex">
                  {/* Days column */}
                  <div className="flex flex-col mr-1 sm:mr-2 w-4 sm:w-8">
                    {(isMobile ? daysMobile : days).map((day, index) => (
                      <div key={index} className={`h-2 sm:h-3 text-xs flex items-center mb-0.5 leading-none ${mutedTextClasses}`}>
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Graph columns - Responsive grid */}
                  <div 
                    className="grid gap-0.5 flex-1 overflow-hidden" 
                    style={{ 
                      gridTemplateColumns: `repeat(${contributionData.length}, minmax(0, 1fr))`,
                      maxWidth: '100%'
                    }}
                  >
                    {contributionData.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-0.5 min-w-0">
                        {week.map((day, dayIndex) => {
                          const isSelected = selectedCell && selectedCell.week === weekIndex && selectedCell.day === dayIndex;
                          return (
                            <div
                              key={dayIndex}
                              className={`w-full h-2 sm:h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10 relative ${getLevelColor(day.level, isSelected)}`}
                              style={{ aspectRatio: '1', minWidth: isMobile ? '4px' : '8px' }}
                              onClick={() => handleCellClick(weekIndex, dayIndex, day.level, day.date)}
                              onMouseEnter={(e) => showTooltip(e, day.date, day.level)}
                              onMouseLeave={hideTooltip}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Graph footer */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4">
              <a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile" className={`text-xs no-underline hover:underline ${linkClasses}`}>
                Learn how we count contributions
              </a>
              
              <div className="flex items-center gap-1 justify-center sm:justify-end">
                <span className={`mr-1 text-xs ${mutedTextClasses}`}>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getLegendColor(level)}`} />
                ))}
                <span className={`ml-1 text-xs ${mutedTextClasses}`}>More</span>
              </div>
            </div>
          </div>

          {/* Selected cell info */}
          {selectedCell && (
            <div className={`mt-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <div className={`text-sm ${textClasses}`}>
                <strong>Selected:</strong> {new Date(selectedCell.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className={`text-xs mt-1 ${mutedTextClasses}`}>
                {selectedCell.level === 0 ? 'No contributions' : 
                 selectedCell.level === 1 ? '1-3 contributions' :
                 selectedCell.level === 2 ? '4-6 contributions' :
                 selectedCell.level === 3 ? '7-9 contributions' : '10+ contributions'}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced Tooltip */}
      {tooltip.show && (
        <div 
          className={`fixed px-3 py-2 rounded-md text-xs whitespace-nowrap z-50 pointer-events-none transition-all duration-200 border ${tooltipClasses}`}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltip.content}
          <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${tooltipArrowClasses}`} />
        </div>
      )}
    </div>
  );
};

export default GitHubContributionGraph;