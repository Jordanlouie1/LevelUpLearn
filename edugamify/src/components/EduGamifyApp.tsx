import { useState } from 'react';

// Define a type for the gamification elements
type GamificationElement = 'quiz' | 'team' | 'timed' | 'poll' | 'role' | 'blanks';

// Define a type for the theme options
type ThemeOption = 'neutral' | 'trivia' | 'quest' | 'mystery';

// Define a type for the delivery options
type DeliveryOption = 'projector' | 'print' | 'both';

// Define a type for the preview content
interface PreviewContent {
  title: string;
  duration: string;
  elements: GamificationElement[];
  theme: ThemeOption;
}

// Define a type for the active tab
type ActiveTab = 'upload' | 'configure' | 'preview';

export default function EduGamifyApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('upload');
  const [lectureContent, setLectureContent] = useState<string>('');
  const [lectureTopic, setLectureTopic] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [gradeLevel, setGradeLevel] = useState<string>('');
  const [duration, setDuration] = useState<string>('45');
  const [elements, setElements] = useState<GamificationElement[]>([]);
  const [theme, setTheme] = useState<ThemeOption>('neutral');
  const [delivery, setDelivery] = useState<DeliveryOption>('both');
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);

  const handleElementToggle = (element: GamificationElement): void => {
    if (elements.includes(element)) {
      setElements(elements.filter(e => e !== element));
    } else {
      if (elements.length < 3) {
        setElements([...elements, element]);
      }
    }
  };

  const handleGenerate = (): void => {
    // In a real app, this would call an API
    setPreviewContent({
      title: lectureTopic,
      duration: duration,
      elements: elements,
      theme: theme
    });
    setActiveTab('preview');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">EduGamify</h1>
        <p className="text-gray-600">Transform your lectures into engaging activities</p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex border-b mb-6">
          <button 
            className={`px-4 py-2 mr-2 ${activeTab === 'upload' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('upload')}>
            1. Upload Content
          </button>
          <button 
            className={`px-4 py-2 mr-2 ${activeTab === 'configure' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('configure')}>
            2. Configure
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
            onClick={() => activeTab === 'preview' && setActiveTab('preview')}>
            3. Preview & Download
          </button>
        </div>

        {activeTab === 'upload' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Lecture Content</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Lecture Topic</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
                placeholder="e.g., The Civil Rights Movement" 
                value={lectureTopic}
                onChange={(e) => setLectureTopic(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mr-3">
                  Upload File
                </button>
                <span className="text-gray-500 text-sm">PDF, PPTX, DOCX, or TXT</span>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Or paste your content:</label>
                <textarea 
                  className="w-full p-3 border rounded h-64 focus:ring focus:ring-indigo-200" 
                  placeholder="Enter your lecture notes, key points, or lesson content here..."
                  value={lectureContent}
                  onChange={(e) => setLectureContent(e.target.value)}
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                onClick={() => setActiveTab('configure')}>
                Next: Configure
              </button>
            </div>
          </div>
        )}

        {activeTab === 'configure' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Configure Your Gamified Lesson</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Subject Area</label>
                <select 
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}>
                  <option value="">Select Subject</option>
                  <option value="science">Science</option>
                  <option value="math">Math</option>
                  <option value="history">History</option>
                  <option value="literature">Literature</option>
                  <option value="social">Social Studies</option>
                  <option value="language">Languages</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Grade Level</label>
                <select 
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}>
                  <option value="">Select Grade Level</option>
                  <option value="elementary">Elementary (K-5)</option>
                  <option value="middle">Middle School (6-8)</option>
                  <option value="high">High School (9-12)</option>
                  <option value="higher">Higher Education</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Engagement Duration</label>
              <div className="flex">
                <label className="mr-4 flex items-center">
                  <input 
                    type="radio" 
                    name="duration" 
                    value="30" 
                    checked={duration === '30'} 
                    onChange={() => setDuration('30')}
                    className="mr-2" 
                  />
                  30 minutes
                </label>
                <label className="mr-4 flex items-center">
                  <input 
                    type="radio" 
                    name="duration" 
                    value="45" 
                    checked={duration === '45'} 
                    onChange={() => setDuration('45')}
                    className="mr-2" 
                  />
                  45 minutes
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="duration" 
                    value="60" 
                    checked={duration === '60'} 
                    onChange={() => setDuration('60')}
                    className="mr-2" 
                  />
                  60 minutes
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Gamification Elements (Choose up to 3)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={elements.includes('quiz')} 
                    onChange={() => handleElementToggle('quiz')}
                    className="mr-2" 
                  />
                  Multiple-choice quiz challenges
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={elements.includes('team')} 
                    onChange={() => handleElementToggle('team')}
                    className="mr-2" 
                  />
                  Team-based point system
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={elements.includes('timed')} 
                    onChange={() => handleElementToggle('timed')}
                    className="mr-2" 
                  />
                  Time-based puzzles or tasks
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={elements.includes('poll')} 
                    onChange={() => handleElementToggle('poll')}
                    className="mr-2" 
                  />
                  Low-stakes classroom polls
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={elements.includes('role')} 
                    onChange={() => handleElementToggle('role')}
                    className="mr-2" 
                  />
                  Role-based discussions
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={elements.includes('blanks')} 
                    onChange={() => handleElementToggle('blanks')}
                    className="mr-2" 
                  />
                  Fill-in-the-blank activities
                </label>
              </div>
              {elements.length >= 3 && (
                <p className="text-amber-600 text-sm mt-2">Maximum 3 elements selected</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Thematic Tone</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="theme" 
                    value="neutral" 
                    checked={theme === 'neutral'} 
                    onChange={() => setTheme('neutral')}
                    className="mr-2" 
                  />
                  Neutral Professional (default)
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="theme" 
                    value="trivia" 
                    checked={theme === 'trivia'} 
                    onChange={() => setTheme('trivia')}
                    className="mr-2" 
                  />
                  Trivia Challenge
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="theme" 
                    value="quest" 
                    checked={theme === 'quest'} 
                    onChange={() => setTheme('quest')}
                    className="mr-2" 
                  />
                  Exploratory Quest
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="theme" 
                    value="mystery" 
                    checked={theme === 'mystery'} 
                    onChange={() => setTheme('mystery')}
                    className="mr-2" 
                  />
                  Mystery Investigation
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Delivery Preferences</label>
              <div className="flex">
                <label className="mr-4 flex items-center">
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="projector" 
                    checked={delivery === 'projector'} 
                    onChange={() => setDelivery('projector')}
                    className="mr-2" 
                  />
                  Projector display
                </label>
                <label className="mr-4 flex items-center">
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="print" 
                    checked={delivery === 'print'} 
                    onChange={() => setDelivery('print')}
                    className="mr-2" 
                  />
                  Printed handouts
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="both" 
                    checked={delivery === 'both'} 
                    onChange={() => setDelivery('both')}
                    className="mr-2" 
                  />
                  Both
                </label>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
                onClick={() => setActiveTab('upload')}>
                Back
              </button>
              <button 
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                onClick={handleGenerate}>
                Generate Gamified Lesson
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preview' && previewContent && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Preview Your Gamified Lesson</h2>
            
            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold">{previewContent.title}</h3>
                <p className="text-gray-600">{previewContent.duration}-minute interactive lesson</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium">Selected Elements:</h4>
                <ul className="list-disc ml-5">
                  {previewContent.elements.map(element => (
                    <li key={element}>
                      {element === 'quiz' && 'Multiple-choice quiz challenges'}
                      {element === 'team' && 'Team-based point system'}
                      {element === 'timed' && 'Time-based puzzles or tasks'}
                      {element === 'poll' && 'Low-stakes classroom polls'}
                      {element === 'role' && 'Role-based discussions'}
                      {element === 'blanks' && 'Fill-in-the-blank activities'}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">Thematic Tone:</h4>
                <p>
                  {previewContent.theme === 'neutral' && 'Neutral Professional'}
                  {previewContent.theme === 'trivia' && 'Trivia Challenge'}
                  {previewContent.theme === 'quest' && 'Exploratory Quest'}
                  {previewContent.theme === 'mystery' && 'Mystery Investigation'}
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg mb-6">
              <div className="bg-gray-100 p-4 border-b">
                <h3 className="font-medium">Lesson Preview</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-500 italic text-center py-12">
                  [A complete preview of your gamified lesson would appear here]
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
                onClick={() => setActiveTab('configure')}>
                Back to Configure
              </button>
              <div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 mr-2">
                  Download PDF
                </button>
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                  Email to Me
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}