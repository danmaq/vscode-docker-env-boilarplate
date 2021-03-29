import { useEffect } from 'react';

const useBodyClassName = (...className: string[]): void =>
  useEffect(() => document.querySelector('body')?.classList.add(...className), [
    className,
  ]);

export default useBodyClassName;
