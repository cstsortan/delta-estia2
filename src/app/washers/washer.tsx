import { h, Component } from 'preact';
import * as firebase from 'firebase/app';


// const dummyWasher = {
// 	userUid: 'some-uid',
// 	name: 'Christos Tsortanidis',
// 	photoUrl: 'https://lh4.googleusercontent.com/-10zRqXUhQGI/AAAAAAAAAAI/AAAAAAAAETo/Aqe95vrydDk/photo.jpg',
// 	endsAt: new Date('January 12, 2019 01:24:00')
// };

class Washer extends Component<any, any> {
	state = {
		remaining: 0,
		optionsOpen: false
    };
    constructor() {
        super();
    }
    
    auth = firebase.auth();
    db = firebase.firestore();
	toggleOptions = () => {
		const { currentUser } = this.auth;
		if (!this.props.washer.functional) {
			return;
		}
		if (!currentUser) {
			this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
			return;
		}
		if (!this.isDone && this.isRunningUser) {
			this.setState(prev => ({ optionsOpen: !prev.optionsOpen }));
		}
		if (this.isDone) {
			this.setState(prev => ({ optionsOpen: !prev.optionsOpen }));
		}
	};

	increment = (count) => {
		if (!this.isDone && this.isRunningUser) {
			this.db.collection('washers')
				.doc(this.props.washer.id)
				.update({
					endsAt: firebase.firestore.Timestamp.fromMillis(this.props.washer.endsAt.toMillis() + count * 60 * 1000)
				});
		}
	};

	onWasherUse = () => {
		if (!this.isDone) return;
		
		this.db.collection('washers')
			.doc(this.props.washer.id)
			.update({
				endsAt: firebase.firestore.Timestamp.fromMillis(Date.now() + 90 * 60 * 1000),
				userUid: this.auth.currentUser.uid,
				name: this.auth.currentUser.displayName,
				photoUrl: this.auth.currentUser.photoURL
			});
	};

	onWasherCancel = () => {
		if (!this.isDone && this.isRunningUser) {
			this.db.collection('washers')
				.doc(this.props.washer.id)
				.update({
					endsAt: firebase
						.firestore
						.Timestamp
						.fromMillis(Date.now())
				});
		}
		this.toggleOptions();
	};
	get isDone() {
		const delta = this.props.washer.endsAt.toMillis() - Date.now();
		return delta < 0;
	}

	get isRunningUser() {
		return this.props.washer.userUid === this.auth.currentUser.uid;
	}

	componentDidMount = () => {
	  setInterval(() => {
		  const delta = this.props.washer.endsAt.toMillis() - Date.now();
		  this.setState({
				remaining: delta
		  });
	  }, 1000);
	};

	render({ washer }, { remaining, optionsOpen }) {
		
		return (
			<div>
				<div onClick={this.toggleOptions} class="washerItem">
					<div>Πλυντήριο {washer.washerName}</div>
					{!this.isDone ? [<div class="washerUser">
						<img class="userPhoto" src={washer.photoUrl} />
						<div class="userName">{washer.name}</div>
					</div>,
					<div class="timer">{msToTime(this.state.remaining)}</div>]
						: <div class="available">
							<div>
								{washer.functional ? 'ΔΙΑΘΕΣΙΜΟ :-D' : <div class="broken">ΧΑΛΑΣΜΕΝΟ :-(</div>}
							</div>
						</div>}
				</div>
				{optionsOpen ? <div class="options">
					<div class="option">
						<div onClick={this.onWasherUse} class="btn">Έναρξη</div>
						<div onClick={() => this.increment(10)} class="btn">+ 10</div>
						<div onClick={() => this.increment(1)} class="btn">+ 1</div>
					</div>
					<div class="option">
						<div onClick={this.onWasherCancel} class="btn">Ακύρωση</div>
						<div onClick={() => this.increment(-10)} class="btn">- 10</div>
						<div onClick={() => this.increment(-1)} class="btn">- 1</div>
					</div>
				</div> : null}
			</div>
		);
	}
}

export default Washer;

function msToTime(duration: number) {
	let minutes = parseInt(`${(duration / (1000 * 60)) % 60}`, 10),
	  hours = parseInt(`${(duration / (1000 * 60 * 60)) % 24}`, 10);
  
	hours = (hours < 10) ? hours : hours;
	minutes = (minutes < 10) ? 0 + minutes : minutes;
  
	return hours + ':' + minutes;
}