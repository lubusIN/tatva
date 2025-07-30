import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { __experimentalVStack as VStack } from '@wordpress/components';
import { ContentLoader, CopyButton } from '../index';

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


function PatternCode({ path, style }) {
  const [isLoading, setIsLoading] = useState(false);
  const [patternCode, setPatternCode] = useState('');

  // ✅ Vite 5-compliant glob setup
  const patternModules = import.meta.glob('/src/docs/patterns/**/*.jsx', {
    query: '?raw',
    import: 'default',
  });

  useEffect(() => {
    const fetchCode = async () => {
      setIsLoading(true);

      try {
        const fullPath = `/src/docs/patterns${path}.jsx`;

        const loader = patternModules[fullPath];

        if (!loader) {
          throw new Error(`No file found at: ${fullPath}`);
        }

        const content = await loader();

        const match = content.match(
          /\{\s*\/\*\s*@code-start\s*\*\/\s*\}([\s\S]*?)\{\s*\/\*\s*@code-end\s*\*\/\s*\}/
        );

        setPatternCode(match ? match[1] : '// No @code block found');
      } catch (err) {
        setPatternCode('// Error loading pattern code');
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
            {normalizeIndentation(patternCode)}
          </SyntaxHighlighter>
          <CopyButton content={patternCode} />
        </>
      )}
    </VStack>
  );
}

export default PatternCode;
