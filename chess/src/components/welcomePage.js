import './welcomePage.css';

const welcomePage = () => (
    <div className="container">
        <div className="title">Welcome to my Chess game!</div>
        <div className="box">
            <select name="options" id="choice">
                <option value="friend">Friend</option>
                <option value="computer">Computer</option>
            </select>
    ></div>

    </div >
);

export default welcomePage;