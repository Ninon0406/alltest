import './ui/styles.css';
// The preserved V7 reader is a compatibility surface for existing runs/tests.
// New visits always use the V8 life loop; this flag never restores saved state.
if(new URLSearchParams(location.search).get('classic')==='1')await import('./classic-main.js');
else await import('./ui/v8-app.js');
