import { useState } from 'react';
import { useCallback } from 'react';

export default function useCheckLang() {
  const [langText, setLangText] = useState("");

  const checkLangText = useCallback((content) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    if (arabicRegex.test(content)) {
      setLangText("ar");
    } else {
      setLangText("en");
    }
  }, []);
  return {
    checkLangText,
    langText
  }
}
