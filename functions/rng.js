module.exports = {
    rng: () => {
        let c = { answer: '', quiz: '' }
        let a = Math.floor(Math.random() * (9999 - 1000) + 1000);
        let b = Math.floor(Math.random() * 4);
        a = a.toString();
        c.answer = a;
        a = a.split('');
        a[b] = '*';
        c.quiz = a.join('');
        return c;
    }
}