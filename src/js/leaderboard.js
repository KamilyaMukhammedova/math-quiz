import '../index.scss';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const usersListContainer = document.getElementById('leaderboard-users-list');
const gameModeSelect = document.getElementById('game-mode');

const getLeaderboardFromLocalStorage = (gameMode) => {
  let currentLeaderboardLocalStorage = '';
  let sortedLeaderboard = '';

  gameMode === 'practice' ?
    currentLeaderboardLocalStorage = JSON.parse(localStorage.getItem('leaderBoardPractice')) :
    currentLeaderboardLocalStorage = JSON.parse(localStorage.getItem('leaderBoardTimeAttack'))
  ;

  if (currentLeaderboardLocalStorage !== null && currentLeaderboardLocalStorage.length > 1) {
    sortedLeaderboard = currentLeaderboardLocalStorage.sort((a, b) => {
      return b.score - a.score;
    });
  } else {
    sortedLeaderboard = [currentLeaderboardLocalStorage];
    if (currentLeaderboardLocalStorage === null) sortedLeaderboard = [];
  }

  if (sortedLeaderboard.length !== 0) {
    sortedLeaderboard.forEach(item => {
      const userData = document.createElement('div');
      userData.className = 'row mb-3';
      userData.innerHTML = `
         <p class="col-7 text-start">${item.userName}</p>
         <p class="col-5 text-end">${item.score}</p>
    `;
      usersListContainer.append(userData);
    });
  }
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

