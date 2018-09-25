export const inviteToSlack = (email) => dispatch => {
    const slackTeam = "aadspace";
    const token = process.env.SLACK_TOKEN; 
    // A test token will suffice.
    // You can generate one at https://api.slack.com/docs/oauth-test-tokens
    // Just make sure that the user issuing the test token is an admin.
    
    const url = 'https://'+ slackTeam + '.slack.com/api/users.admin.invite';
    fetch(url, { 
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: "token="+ token + "&email=" + email
    })
    .then(res => {
      console.log(res)
      return res
    })
    .catch(err => console.log('Invite to Slack Failed', err));
}