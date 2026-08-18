import ToolCard from '../ToolCard/ToolCard';
import './ToolGrid.css';

function ToolGrid({ tools }) {
  return (
    <div className="tool-grid">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

export default ToolGrid;
