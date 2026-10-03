(function () {
  'use strict';

  // Replace these four values when the problem video and captions are ready.
  const videoConfig = {
    videoSrc: '',
    posterSrc: '',
    captionsSrc: '',
    title: 'The Everyday Access problem story'
  };

  const stages = ['Transaction', 'Signals', 'AI Analysis', 'Risk Assessment', 'Decision', 'Customer Outcome'];
  const scenarios = [
    {
      id: 'everyday',
      merchant: 'Northline Market',
      amount: '$34.60',
      context: 'Familiar in-store purchase',
      signals: ['Spending pattern: typical', 'Merchant activity: familiar', 'Location: normal'],
      score: 12,
      risk: 'low',
      decision: 'Approved',
      badge: 'badge--green',
      marker: '✓',
      outcome: 'The purchase goes through. There is no interruption.',
      descriptions: [
        'A routine debit purchase enters the proposed protection flow.',
        'The spending pattern, merchant, and location all look familiar.',
        'Illustrative analysis compares these signals with normal activity.',
        'The illustrative score is low: 12 out of 100.',
        'The purchase is approved without asking the customer to stop.',
        'The customer completes the purchase with no interruption.'
      ],
      explanations: [
        'The same decision journey begins for each purchase.',
        'Signals provide context; a score alone does not tell the customer what happened.',
        'This demo uses scripted examples. It is not a live AI model.',
        'A lower illustrative score corresponds to less concern in this scenario.',
        'No confirmation is needed for this familiar activity.',
        'The customer keeps moving.'
      ]
    },
    {
      id: 'unusual',
      merchant: 'Harbor Tech',
      amount: '$286.00',
      context: 'New merchant and unusual location',
      signals: ['Spending pattern: unusual', 'Merchant activity: new', 'Location: outside normal area'],
      score: 58,
      risk: 'medium',
      decision: 'Verification required',
      badge: 'badge--amber',
      marker: '!',
      outcome: 'An in-app banner and push notification ask: “Is this purchase yours?”',
      descriptions: [
        'An unfamiliar purchase enters the proposed protection flow.',
        'The merchant and location do not match the usual pattern.',
        'Illustrative analysis connects the unusual signals.',
        'The illustrative score calls for a customer check: 58 out of 100.',
        'Verification is required before the next customer step.',
        'An in-app banner and push notification ask the customer to confirm the purchase.'
      ],
      explanations: [
        'A new purchase should not become a silent mystery.',
        'The customer sees why this example needs attention.',
        'This demo uses scripted examples. It is not a live AI model.',
        'A middle illustrative score triggers a question, not an automatic fraud finding.',
        'Approving a legitimate purchase keeps the customer moving.',
        'The customer can choose Yes or No in the in-app prompt.'
      ]
    },
    {
      id: 'fraud',
      merchant: 'Meridian Digital',
      amount: '$412.00',
      context: 'Unrecognized online purchase',
      signals: ['Spending pattern: unusual', 'Merchant activity: unfamiliar', 'Location: unrecognized'],
      score: 91,
      risk: 'high',
      decision: 'Blocked · card locked',
      badge: 'badge--red',
      marker: '✕',
      outcome: 'After the customer selects “No, this wasn’t me,” the card is locked and a replacement digital card is offered for a supported wallet.',
      descriptions: [
        'An unrecognized purchase enters the proposed protection flow.',
        'The pattern, merchant, and location all need attention.',
        'Illustrative analysis connects the high-risk signals.',
        'The illustrative score is high: 91 out of 100.',
        'In this preselected scenario, the customer taps “No, this wasn’t me.” The purchase is blocked and the card is locked.',
        'A replacement digital card is offered for a supported mobile wallet so access can be restored while the physical card is mailed.'
      ],
      explanations: [
        'This is a fictional purchase, not a real debit transaction.',
        'The signals explain why the customer gets a confirmation prompt.',
        'This demo uses scripted examples. It is not a live AI model.',
        'The high score is illustrative; actual results vary.',
        'The customer’s No answer confirms the fraud scenario and starts recovery.',
        'Wallet availability depends on eligibility and acceptance.'
      ]
    }
  ];

  const byId = (id) => document.getElementById(id);
  const radioOptions = Array.from(document.querySelectorAll('input[name="scenario"]'));
  const stageItems = Array.from(document.querySelectorAll('#stage-list li'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scenarioIndex = 0;
  let currentStage = -1;
  let timer = null;
  let running = false;

  function setVideo() {
    if (!videoConfig.videoSrc) return;
    const slot = byId('video-slot');
    if (!videoConfig.captionsSrc) {
      slot.querySelector('.video-placeholder span:last-child').textContent = 'Add a captions file in home.js to enable the video.';
      return;
    }
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', videoConfig.title);
    if (videoConfig.posterSrc) video.poster = videoConfig.posterSrc;
    const source = document.createElement('source');
    source.src = videoConfig.videoSrc;
    source.type = 'video/mp4';
    const track = document.createElement('track');
    track.kind = 'captions';
    track.src = videoConfig.captionsSrc;
    track.srclang = 'en';
    track.label = 'English';
    track.default = true;
    video.append(source, track);
    slot.replaceChildren(video);
    slot.removeAttribute('aria-label');
  }

  function setupMenu() {
    const toggle = byId('menu-toggle');
    const nav = byId('site-nav');
    document.documentElement.classList.add('js-enabled');
    function closeMenu() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 52.51rem)').addEventListener('change', closeMenu);
  }

  function selectedScenario() {
    return scenarios[scenarioIndex];
  }

  function announce(message) {
    byId('stage-announcement').textContent = message;
  }

  function renderTransaction() {
    const scenario = selectedScenario();
    byId('sim-merchant').textContent = scenario.merchant;
    byId('sim-amount').textContent = scenario.amount;
    byId('sim-context').textContent = scenario.context;
  }

  function renderStage(index, speak = true) {
    const scenario = selectedScenario();
    currentStage = index;
    stageItems.forEach((item, i) => {
      const state = index < 0 ? 'pending' : i < index ? 'complete' : i === index ? 'current' : 'pending';
      item.dataset.state = state;
      item.querySelector('span').textContent = String(i + 1).padStart(2, '0') + ' · ' + (state === 'current' ? 'Now' : state === 'complete' ? 'Done' : 'Waiting');
      if (state === 'current') item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });

    const detail = byId('stage-detail');
    if (index < 0) {
      detail.querySelector('h4').textContent = 'Ready when you are';
      detail.querySelectorAll('p')[1].textContent = 'Select a scenario and run the analysis.';
      detail.querySelector('.stage-detail__explanation').textContent = 'This is a visual explanation of the proposed experience, using fictional purchases and illustrative scores.';
    } else {
      detail.querySelector('h4').textContent = stages[index];
      detail.querySelectorAll('p')[1].textContent = scenario.descriptions[index];
      detail.querySelector('.stage-detail__explanation').textContent = scenario.explanations[index];
    }

    const signals = byId('sim-signals');
    signals.replaceChildren();
    const shownSignals = index >= 1 ? scenario.signals : ['Signals will appear when analysis runs.'];
    shownSignals.forEach((signal) => {
      const item = document.createElement('li');
      item.textContent = signal;
      signals.append(item);
    });

    const riskValue = byId('risk-value');
    const meter = byId('risk-meter');
    const fill = byId('risk-fill');
    if (index >= 3) {
      riskValue.textContent = scenario.score + ' / 100 · ' + ({ low: 'Low', medium: 'Needs attention', high: 'High' }[scenario.risk]);
      meter.setAttribute('aria-valuenow', String(scenario.score));
      meter.setAttribute('aria-valuetext', riskValue.textContent);
      fill.dataset.risk = scenario.risk;
      fill.style.width = scenario.score + '%';
    } else {
      riskValue.textContent = 'Not assessed';
      meter.setAttribute('aria-valuenow', '0');
      meter.setAttribute('aria-valuetext', 'Not assessed');
      fill.removeAttribute('data-risk');
      fill.style.width = '0';
    }

    const result = byId('sim-result');
    result.replaceChildren();
    if (index >= 4) {
      const badge = document.createElement('span');
      badge.className = 'badge ' + scenario.badge;
      badge.textContent = scenario.marker + ' ' + scenario.decision;
      result.append(badge);
      if (index >= 5) {
        const outcome = document.createElement('p');
        outcome.textContent = scenario.outcome;
        result.append(outcome);
      }
    }

    byId('previous-step').disabled = running || index <= 0;
    byId('next-step').disabled = running || index < 0 || index >= stages.length - 1;
    if (speak && index >= 0) announce('Stage ' + (index + 1) + ' of 6: ' + stages[index] + '. ' + scenario.descriptions[index]);
  }

  function stopAnimation() {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
    running = false;
    byId('run-analysis').disabled = false;
  }

  function reset() {
    stopAnimation();
    renderTransaction();
    renderStage(-1, false);
    byId('replay-analysis').disabled = true;
    announce('Scenario ready: ' + selectedScenario().merchant + '. Run analysis to begin.');
  }

  function finishRun() {
    running = false;
    timer = null;
    byId('run-analysis').disabled = false;
    byId('replay-analysis').disabled = false;
    byId('previous-step').disabled = false;
    byId('next-step').disabled = true;
  }

  function runAnalysis() {
    stopAnimation();
    renderStage(-1, false);
    byId('replay-analysis').disabled = true;
    if (reducedMotion.matches) {
      renderStage(stages.length - 1);
      finishRun();
      return;
    }
    running = true;
    byId('run-analysis').disabled = true;
    let index = 0;
    function advance() {
      renderStage(index);
      if (index === stages.length - 1) {
        finishRun();
      } else {
        index += 1;
        timer = window.setTimeout(advance, 720);
      }
    }
    advance();
  }

  function setupSimulator() {
    radioOptions.forEach((radio, index) => radio.addEventListener('change', () => {
      if (radio.checked) {
        scenarioIndex = index;
        reset();
      }
    }));
    byId('run-analysis').addEventListener('click', runAnalysis);
    byId('replay-analysis').addEventListener('click', runAnalysis);
    byId('next-scenario').addEventListener('click', () => {
      scenarioIndex = (scenarioIndex + 1) % scenarios.length;
      radioOptions[scenarioIndex].checked = true;
      reset();
      runAnalysis();
    });
    byId('previous-step').addEventListener('click', () => renderStage(Math.max(0, currentStage - 1)));
    byId('next-step').addEventListener('click', () => renderStage(Math.min(stages.length - 1, currentStage + 1)));
    reset();
  }

  function setupPrompt() {
    document.querySelectorAll('[data-prompt-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        byId('prompt-result').textContent = button.dataset.promptAnswer === 'yes'
          ? '✓ Approved. A recognized purchase can continue.'
          : '✕ Blocked. The card is locked and the recovery path begins.';
      });
    });
  }

  setVideo();
  setupMenu();
  setupSimulator();
  setupPrompt();
})();
