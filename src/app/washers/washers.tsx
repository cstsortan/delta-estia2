import { h, Component, render } from 'preact';
// import style from './style';
import Washer from './washer';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { collectionData } from 'rxfire/firestore';

const washersCol = firebase.firestore().collection('washers');

class Washers extends Component {
    _sub: any;
	state = {
		washers: []
	};

	componentDidMount() {
		this._sub = collectionData(washersCol.orderBy('washerName'), 'id')
			.subscribe(washers => this.setState({ washers }));
	}

	componentWillUnmount() {
		this._sub.unsubscribe();
	}
	
	render({}, { washers }) {
		return (
			<div class="washersRoot">
				{washers.map(washer => <Washer key={washer.id} washer={washer} />)}
			</div>);
	}
}

class DEWashers extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
        <style>
        .washersRoot {
            display: flex;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 20px;
            flex-direction: column;
            overflow-y: auto;
        }
        .washerItem {
            background-color: #383838;
            color: white; 
            padding: 16px 36px;
            border-radius: 16px;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            user-select: none;
        }
        
        .timer {
            margin-top: 10px;
            color: red;
            font-size: 25px;
        }
        
        .washerUser {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: center;
            margin-top: 10px;
            align-items: center;
        }
        
        .userName {
            font-size: 12px;
        }
        .userPhoto {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
        
        .available {
            margin-top: 10px;
            color: green;
        }
        
        .options {
            display: flex;
            width: 100%;
            flex-direction: column;
            margin-top: 10px;
        }
        
        .option {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
        }
        
        .btn {
            color: white;
            background-color: #464545;
            padding: 8px;
            margin: 4px;
            margin-bottom: 20px;
            user-select: none;
            border-radius: 8px;
        }
        
        .broken {
            color: red;
        }
        </style>
        `;
        const washersRoot = document.createElement('div');
        this.shadowRoot.appendChild(washersRoot);
        render(<Washers />, washersRoot);
    }
}
customElements.define('de-washers', DEWashers);
