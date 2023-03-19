import React, { useState } from 'react';

export default function Toolbar({
    clickHeader,
    clickBold,
    clickItalic,
    clickStrike,
    clickBlockquote,
    clickCode,
    clickLink
}) {
    const [selectedHeader, setSelectedHeader] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isStrike, setIsStrike] = useState(false);
    const [isBlockquote, setIsBlockquote] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [link, setLink] = useState('');

    const handleHeader = (header) => {
            setSelectedHeader(header);
            clickHeader(header);
        
    };
    const handleBold = () => {
        setIsBold(prev => !prev);
        clickBold();
    }


    return (
        <div>
            <button onClick={() => handleHeader(' # ')} style={{ fontWeight: selectedHeader === '# ' ? 'bold' : 'normal' }}>H1</button>
            <button onClick={() => handleHeader(' ## ')} style={{ fontWeight: selectedHeader === '## ' ? 'bold' : 'normal' }}>H2</button>
            <button onClick={() => handleHeader(' ### ')} style={{ fontWeight: selectedHeader === '### ' ? 'bold' : 'normal' }}>H3</button>
            <button onClick={() => handleHeader(' #### ')} style={{ fontWeight: selectedHeader === '#### ' ? 'bold' : 'normal' }}>H4</button>
            <button onClick={handleBold} style={{fontWeight: isBold ? 'bold' : 'normal'}}>B</button>
        </div>
    );
}

