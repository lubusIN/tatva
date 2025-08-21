/**
 * External dependencies.
 */
import { useState } from 'react';
import { useCopyToClipboard } from '@wordpress/compose';
import { GoCopy, GoCheck } from "react-icons/go";
import {
    Popover,
    Button,
} from "@wordpress/components";

/**
 * Internal dependencies.
 */
import './style.scss'

/**
 * Renders a button that allows users to copy content to the clipboard.
 * 
 * @param {Object} props - The properties for the component.
 * @param {string} props.content - The content to be copied to the clipboard.
 * @returns {JSX.Element} - The rendered Copy Button component.
 */
function CopyButton({ content }) {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopyClick = () => {
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied(false);
        }, 1000);
    };

    return (
        <Button
            className='tatva-copy'
            icon={hasCopied ? GoCheck : GoCopy}
            onClick={handleCopyClick}
            ref={useCopyToClipboard(content)}
        >
            {hasCopied && (
                <Popover
                    className='copied-pop'
                    position='middle left'
                >
                    Copied
                </Popover>
            )}
        </Button>
    );
}

export default CopyButton;