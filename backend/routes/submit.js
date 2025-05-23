const express = require('express');
const axios = require('axios');
const Problem = require('../models/problems');
const User = require('../models/User');
const router = express.Router();

const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';

const headers = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': '09a9472c1bmsh5a7173c0d214d27p10608ajsne47fb1ef36c1',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
};

const languageMap = {
  cpp: 54,
  python: 71,
  java: 62,
  javascript: 63
};

router.post('/', async (req, res) => {
  const { code, language, problemId, email } = req.body;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const sampleCases = problem.sampleCases;
    const results = [];

    for (let testCase of sampleCases) {
      const { input, output: expectedOutput } = testCase;

      const judgeRes = await axios.post(JUDGE0_API, {
        source_code: code,
        language_id: languageMap[language],
        stdin: input
      }, { headers });

      const actualOutput = judgeRes.data.stdout?.trim();
      const status = (actualOutput === expectedOutput.trim()) ? 'Passed' : 'Failed';

      results.push({
        input,
        expectedOutput,
        actualOutput,
        status
      });
    }

    const allPassed = results.every(r => r.status === 'Passed');

    if (allPassed && email) {
      const user = await User.findOne({ email });

      if (user) {
        const alreadySubmitted = user.submissions.includes(problem.questionNumber);

        if (!alreadySubmitted) {
          await User.updateOne(
            { email },
            {
              $addToSet: { submissions: problem.questionNumber },
              $inc: { score: 10 }
            }
          );
        }
      }
    }

    res.json({
      message: 'Execution complete',
      results
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Execution failed' });
  }
});

module.exports = router;
