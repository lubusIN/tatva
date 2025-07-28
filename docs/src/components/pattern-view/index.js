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

function PatternView({ title, name, category, path, component: Pattern }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(380);

  const updateHeight = () => {
    const iframeBody = iframeRef.current?.contentWindow?.document.body;
    if (iframeBody) {
      const bufferPx = category === 'Shells' ? 0 : 3;
      setHeight(iframeBody.scrollHeight + bufferPx);
    }
  };



  return (
    <VStack spacing={0} className="pattern-view">
      <Heading level={2} weight={600} align="center" className="heading">
        {title}
      </Heading>

      <Card className="preview-card">
        <iframe
          loading="lazy"
          height={`${height}px`}
          src={`/?mode=embed&category=${category}&pattern=${name}`}
          title={title}
        />
              <PatternCode path={path} />
      </Card>
    </VStack>
  );
}

export default PatternView;