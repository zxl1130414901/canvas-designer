import { useRef } from 'react';
import { Canvas, type CanvasRef } from './components/canvas/Canvas';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { PropertyPanel } from './components/properties/PropertyPanel';

function App() {
  const canvasRef = useRef<CanvasRef>(null);

  const handleExportSVG = () => {
    if (canvasRef.current) {
      canvasRef.current.exportToSVG();
    }
  };

  const handleExportPNG = () => {
    if (canvasRef.current) {
      canvasRef.current.exportToPNG();
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="main-layout">
        {/* Left Sidebar - Tools */}
        <Sidebar 
          onExportSVG={handleExportSVG}
          onExportPNG={handleExportPNG}
        />
        
        {/* Canvas Area */}
        <div className="canvas-area">
          <Canvas 
            ref={canvasRef}
            onExportSVG={handleExportSVG}
            onExportPNG={handleExportPNG}
          />
        </div>
        
        {/* Right Panel - Properties */}
        <PropertyPanel />
      </div>
    </div>
  );
}

export default App;
