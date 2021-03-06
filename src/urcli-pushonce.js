// project dependencies
const cli = require('commander');
const PushBullet = require('pushbullet');

cli
  .arguments('<accessToken>')
  .action((accessToken) => {
    const title = 'Testnotification from urcli';
    const open = 'https://example.com';
    // Use PushBullet to notify all of the users active devices.
    const pusher = new PushBullet(accessToken);
    // Check for active devices.
    pusher.devices((err, res) => {
      if (err) {
        console.error(err);
        return new Error('PushBullet error: ');
      }
      if (!res.devices.length) {
        return new Error('Found no active devices to push to.');
      }
      console.log(res);
      // Save active devices.
      pusher.link({}, title, open, (error) => {
        if (error) throw new Error('Failed to push to any active devices.', error);
      });
      return res;
    });
  })
  .parse(process.argv);
