import test from 'ava';
import proxyquire from 'proxyquire';

// eslint-disable-next-line object-shorthand
const guardCat = proxyquire('./', {'github-api': function () {
  this.getUser = () => {
    return {
      listNotifications: ({page}) => {
        return new Promise(resolve => {
          resolve(require(`./fixtures/page-${page}`));
        });
      }
    };
  };
}});

test('should reject with missing params', async t => {
  try {
    await guardCat.run();
    await guardCat.run({token: 'abc'});
    await guardCat.run({repoPatterns: []});
  } catch (err) {
    t.pass();
  }
});

test('should get filtered notifications', async t => {
  try {
    const notifications = await guardCat.run(
      {token: 'abc', repoPatterns: ['jessica/*', 'winston/bishop']}
    );

    t.is(notifications[0].id, 1);
    t.is(notifications[1].id, 3);
    t.is(notifications[2].id, 6);
    t.is(notifications[3].id, 7);
  } catch (err) {
    console.log(err);
    t.fail();
  }
});
