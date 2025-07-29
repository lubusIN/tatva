import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { __experimentalVStack as VStack } from '@wordpress/components';
import { ContentLoader, CopyButton } from '../index';

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

        setPatternCode(match ? match[1].trim() : '// No @code block found');
      } catch (err) {
        console.error(err);
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
            }}
            wrapLongLines
          >
            {patternCode}
          </SyntaxHighlighter>
          <CopyButton content={patternCode} />
        </>
      )}
    </VStack>
  );
}

export default PatternCode;
