import { FC } from 'react'
import './InputField.css'

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}
 

const InputField: FC<Props> = ({ value, setValue, onSubmit, placeholder }) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className="inputField">
            <input
                value={value}
                placeholder={placeholder}
                onChange={(event) => setValue(event.target.value)}
                onKeyPress={handleKeyPress}
            />
            <span className="searchIcon" onClick={onSubmit}>
            <img src='/RIP_Frontend/searchIcon.png' width={30} alt="logo"/>
            </span>
        </div>
    );
};
export default InputField