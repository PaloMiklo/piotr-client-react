export const copyToClipboard = (target: string, stateRef: React.Dispatch<React.SetStateAction<boolean>>) => {
    const textField = document.createElement('textarea');
    textField.innerText = target;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    stateRef(true);
    setTimeout(() => stateRef(false), 1000)
};