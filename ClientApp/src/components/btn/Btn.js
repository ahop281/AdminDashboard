import './btn.scss'

const Btn = (props) => {
    return (
        <button className='btn' {...props}>
            {props.children}
        </button>
    )
}

export default Btn