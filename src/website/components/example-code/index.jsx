/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { __experimentalVStack as VStack } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { ContentLoader, CopyButton } from '@tatva/components';

function normalizeIndentation(code) {
  const lines = code.split('\n');

  // Remove empty lines from the start and end
  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

  // Find the minimum number of leading spaces in non-empty lines
  const indents = lines
    .filter(line => line.trim() !== '')
    .map(line => line.match(/^(\s*)/)[1].length);

  const minIndent = Math.min(...indents);

  // Remove the minimum indent from each line
  const normalized = lines.map(line => line.slice(minIndent)).join('\n');

  return normalized;
}


function ExampleCode({ path, style }) {
  const [isLoading, setIsLoading] = useState(false);
  const [exampleCode, setExampleCode] = useState('');

  // ✅ Vite 5-compliant glob setup
  const exampleModules = import.meta.glob('/src/website/examples/**/*.jsx', {
    query: '?raw',
    import: 'default',
  });

  useEffect(() => {
    const fetchCode = async () => {
      setIsLoading(true);

      try {
        const fullPath = `/src/website/examples${path}.jsx`;

        const loader = exampleModules[fullPath];

        if (!loader) {
          throw new Error(`No file found at: ${fullPath}`);
        }

        const content = await loader();

        const match = content.match(
          /\{\s*\/\*\s*@code-start\s*\*\/\s*\}([\s\S]*?)\{\s*\/\*\s*@code-end\s*\*\/\s*\}/
        );

        setExampleCode(match ? match[1] : '// No @code block found');
      } catch (err) {
        setExampleCode('// Error loading example code');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCode();
  }, [path]);

  return (
    <VStack
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {isLoading ? (
        <ContentLoader />
      ) : (
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
            {normalizeIndentation(exampleCode)}
          </SyntaxHighlighter>
          <CopyButton content={exampleCode} />
        </>
      )}
    </VStack>
  );
}

export default ExampleCode;
