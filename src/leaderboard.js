import './index.scss';
import 'bootstrap';

const usersListContainer = document.getElementById('leaderboard-users-list');
const gameModeSelect = document.getElementById('game-mode');

const getLeaderboardFromLocalStorage = (gameMode) => {
  let currentLeaderboardLocalStorage = '';

  gameMode === 'practice' ?
    currentLeaderboardLocalStorage = JSON.parse(localStorage.getItem('leaderBoardPractice')) :
    currentLeaderboardLocalStorage = JSON.parse(localStorage.getItem('leaderBoardTimeAttack'))
  ;

  const sortedLeaderboard = currentLeaderboardLocalStorage.sort((a, b) => {
    return b.score - a.score;
  });

  sortedLeaderboard.forEach(item => {
    const userData = document.createElement('div');
    userData.className = 'row mb-3';
    userData.innerHTML = `
         <p class="col-7 text-start">${item.userName}</p>
         <p class="col-5 text-end">${item.score}</p>
    `;
    usersListContainer.append(userData);
  });
};

gameModeSelect.addEventListener('change', (e) => {
  usersListContainer.innerText = '';

  e.target.value === 'practice-mode' ?
    getLeaderboardFromLocalStorage('practice') : getLeaderboardFromLocalStorage('time-attack')
  ;
});

window.addEventListener('DOMContentLoaded', () => {
  const userCurrentGameModeLocalStorage = JSON.parse(localStorage.getItem('currentGameMode'));

  userCurrentGameModeLocalStorage === 'practice' ?
    gameModeSelect.value = 'practice-mode' : gameModeSelect.value = 'time-attack-mode'
  ;

  getLeaderboardFromLocalStorage(userCurrentGameModeLocalStorage);
});

