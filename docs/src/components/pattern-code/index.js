/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { __experimentalVStack as VStack } from "@wordpress/components";
/**
 * Internal dependencies.
 */
import { ContentLoader, CopyButton } from '../index';

/**
 * Render Pattern Code
 */
function PatternCode({ path, style }) {
  const [isLoading, setIsLoading] = useState(false);
  const [patternCode, setPatternCode] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchCode(path);
  }, [])

  const fetchCode = async (path) => {
    try {
      const content = await import(
        /* webpackPrefetch: true */
        `!!raw-loader!/src/patterns${path}.js`
      ).then((pattern) => pattern.default);

      // Match content inside JSX-style comment block
      const codeBlockMatch = content.match(
        /\{\s*\/\*\s*@code-start\s*\*\/\s*\}([\s\S]*?)\{\s*\/\*\s*@code-end\s*\*\/\s*\}/
      );

      const finalCode = codeBlockMatch
        ? codeBlockMatch[1].trim()
        : '// No @code block found';

      setPatternCode(finalCode);

    } catch (error) {
      setPatternCode('// Error loading pattern code');
    } finally {
      setIsLoading(false);
    }
  };

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
            wrapLongLines={true}
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