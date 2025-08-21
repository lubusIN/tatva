/**
 * External dependencies.
 */
import { renderToString } from 'react-dom/server';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import vkbeautify from 'vkbeautify';

/**
 * Internal dependencies.
 */
import { CopyButton } from '@tatva/components';

/**
 * ExampleCode Component
 * Renders the code of the provided component.
 * 
 * @param {*} rawComponent - The raw component to render.
 * @returns {JSX.Element} - The rendered code component.
 */
function ExampleCode({ rawComponent }) {

  if (!rawComponent) {
    return;
  }

  let htmlCode = renderToString(rawComponent());
  const componentStart = htmlCode.indexOf('<tatva-image-compare');
  if (componentStart !== -1) {
    htmlCode = htmlCode.substring(componentStart);
  }
  const formatted = vkbeautify.xml(htmlCode, 2);

  return (
    <>
      <SyntaxHighlighter
        language="jsx"
        style={coldarkDark}
        customStyle={{
          fontSize: '0.85rem',
          textAlign: 'left',
          height: '100%',
          margin: 0,
          padding: '1rem',
          paddingRight: '2.5rem',
        }}
        codeTagProps={{
          style: {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }
        }}
        wrapLongLines={true}
      >
        {formatted}
      </SyntaxHighlighter>
      <CopyButton content={formatted} />
    </>
  );
}

export default ExampleCode;
