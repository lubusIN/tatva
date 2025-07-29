/**
 * External dependencies.
 */
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

/**
 * internal dependencies.
 */
import gettingStarted from "@tatva/docs/getting-started.md"

function GettingStarted() {x
  return (
    <div className="getting_started">
      <Markdown remarkPlugins={[remarkGfm]}>{gettingStarted}</Markdown>
    </div>
  );
};
export default GettingStarted;