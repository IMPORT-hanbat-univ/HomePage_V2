import React, { useEffect, useState } from "react";

export default function usePatchnoteNav(patchnoteList, patchnote) {
  const [prevPatchnote, setPrevPatchnote] = useState(null);
  const [nextPatchnote, setNextPatchnote] = useState(null);

  useEffect(() => {
    console.log(patchnote, patchnoteList);
    if (patchnote && patchnoteList && patchnoteList.length > 0) {
      const index = patchnoteList.findIndex((patch) => patch.id === patchnote.id);
      setNextPatchnote(patchnoteList[index + 1]);
      setPrevPatchnote(patchnoteList[index - 1]);
    }
  }, [patchnote, patchnoteList]);
  return {
    prevPatchnote,
    nextPatchnote,
  };
}
