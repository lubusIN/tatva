/**
 * External dependencies.
 */
import { useRef, useEffect, useState } from "react";
/**
 * WordPress dependencies.
 */
import {
  Card,
  __experimentalVStack as VStack,
  __experimentalHeading as Heading
} from "@wordpress/components";
/**
 * Internal dependencies.
 */
import { PatternCode } from "../index";
import './style.scss';

function PatternViewTatva({ title, name, category, path, component: Pattern }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(380);

  const updateHeight = () => {
    const iframeBody = iframeRef.current?.contentWindow?.document.body;
    if (iframeBody) {
      const bufferPx = category === 'Shells' ? 0 : 3;
      setHeight(iframeBody.scrollHeight + bufferPx);
    }
  };

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentWindow.document;
      const observer = new MutationObserver(() => updateHeight());
      observer.observe(iframeDocument.body, { childList: true, subtree: true });
      updateHeight();
      return () => observer.disconnect();
    }
  }, []);

  return (
    <VStack spacing={0} className="tatva-pattern-view">
      <Heading level={2} weight={600} align="center" className="tatva-heading">
        {title}
      </Heading>

      <Card className="tatva-preview-card">
        <iframe
          loading="lazy"
          seamless
          ref={iframeRef}
          height={`${height}px`}
          src={`/?mode=embed&category=${category}&pattern=${name}`}
          title={title}
        />
              <PatternCode path={path} />
      </Card>
    </VStack>
  );
}

export default PatternViewTatva;