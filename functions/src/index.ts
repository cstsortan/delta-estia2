import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
admin.initializeApp();

const postsCol = admin.firestore().collection('posts');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const onQuestionAnswered = functions.https.onRequest(async (req, res) => {
    await postQuestion();
    res.send({
        msg: 'set!'
    });
});

export const onCommentPosted = functions.firestore
    .document('posts/{postId}/comments/{commentId}')
    .onCreate(async (snap, context) => {

        const postSnap = await postsCol.doc(context.params.postId).get();
        if (!postSnap.exists) {
            return;
        }
        const comment = snap.data();

        if (comment && comment.userUid === 'delta-estia') {
            return;
        }

        const post = postSnap.data();
        if (post && post.metadata && post.metadata.isQuestion) {
            // It's an answer to a question!
            // Check correctness!!

            await postSnap.ref.update({
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });

            if (post.metadata.answeredBy) {
                await snap.ref.delete();
                return;
            }

            if (`${post.metadata.correctAnswer}` === comment!.text.trim()) {
                // Answered correctly
                const p1 =  postComment(postSnap.id, `Σωστά ${comment ? comment.authorName : 'Unknown'}! Συγχαριτήρια!!`);
                const p2 =  postSnap.ref.update({
                    metadata: {
                        ...post.metadata,
                        answeredBy: {
                            userUid: comment ? comment.userUid || null : null,
                            authorName: comment ? comment.authorName || null : null,
                            photoUrl: comment ? comment.photoUrl || null : null
                        }
                    }
                });
                const p3 =  postQuestion();
                await Promise.all([p1, p2, p3]);
            } else {
                // Say it was wrong answer!
                await postComment(postSnap.id, `Λάθος απάντηση ${comment ? comment.authorName : 'Unknown'}`);
            }
        }

    });

export const postQuestion = async () => {
    const question = await getQuestion();

    let possibleAnswers = [
        question.correct_answer,
        ...question.incorrect_answers,
    ];
    possibleAnswers = shuffle(possibleAnswers);

    await postsCol.add({
        text: `
            ${question.question}
            \n
            ${possibleAnswers.map((answer, i) => {
            return `${i+1} -> ${answer}\n`
        })}
        `,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        floor: -1,
        color: "default",
        imageUrl: "https://catholicstudentleadership.files.wordpress.com/2017/03/31.png?w=736",
        metadata: {
            isQuestion: true,
            questionData: question,
            shuffledAnswers: possibleAnswers,
            correctAnswer: possibleAnswers.indexOf(possibleAnswers.find(a => a === question.correct_answer)!) + 1,
        },

    });

}

export const postComment = async (postId: string, text: string) => {
    const commentRef = await postsCol.doc(postId).collection('comments').add({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        authorName: 'Delta Estia',
        photoUrl: 'https://lh3.googleusercontent.com/v5-ZrpO0jya6SEv-2r5KKGhv-sbNZ0NC-AVp_VGPIu8YTFSPovVXuNxh7GpunVXGbA=s180-rw',
        userUid: "delta-estia",
        text,
    });

    await commentRef.update({
        id: commentRef.id,
    });
}

export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export const getQuestion = async () => {
    // GET https://opentdb.com/api.php?amount=1
    // RESPONSE: 
    /*
    {
        response_code: 0,
        results: [
                {
                category: "History",
                type: "multiple",
                difficulty: "easy",
                question: "The idea of Socialism was articulated and advanced by whom?",
                correct_answer: "Karl Marx",
                    incorrect_answers: [
                        "Vladimir Lenin",
                        "Joseph Stalin",
                        "Vladimir Putin"
                    ]
                }
            ]
        }
*/

    const { data } = await axios.get(`https://opentdb.com/api.php?amount=1`);

    return data.results[0] as Question;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}