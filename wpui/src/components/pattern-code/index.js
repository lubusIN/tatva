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

        // Remove @meta
        const codeWithoutMeta = content.replace(
            /^\s*\/\/ @meta-start[\s\S]*?\/\/ @meta-end\s*$/gm,
            ''
        );

        const lines = codeWithoutMeta.split('\n');
        let capturing = false;
        let tagBlock = [];

        for (let line of lines) {
            if (!capturing && line.trim().startsWith('<tatva-')) {
                capturing = true;
            }

            if (capturing) {
                tagBlock.push(line);
                if (line.includes('/>') || line.includes('</tatva-')) {
                    // Stop capturing when the tag ends
                    break;
                }
            }
        }
        const finalCode = tagBlock.length
            ? tagBlock.join('\n')
            : '// No tatva-* tag found';
        setPatternCode(finalCode.trim());
        
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
            overflowY: 'auto',
            overflowX: 'auto',
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
                  margin: 0,
                }}
                wrapLines={true}
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