/**
 * External dependencies.
 */
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

/**
 * internal dependencies.
 */
import gettingStarted from "@tatva/docs/getting-started.md?raw";

function GettingStarted() {
  return (
    <div className="getting_started">
      <Markdown remarkPlugins={[remarkGfm]}>{gettingStarted}</Markdown>
    </div>
  );
};
export default GettingStarted;