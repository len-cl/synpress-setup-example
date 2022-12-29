/* eslint-disable ui-testing/no-disabled-tests */

// 0x18D55201ac6EFcb4180B8f86d8CB5F524b81efA9
const SECRET_WORDS =
  'organ leopard helmet voice math cactus pitch else perfect firm matrix curtain';

const METAMASK_PASSWORD="test.cl.secret.yo";

const NETWORK_CONFIG = {
  networkName: 'Mumbai Testnet',
  rpcUrl: 'https://polygon-rpc.com',
  chainId: '80001',
  symbol: 'MATIC',
  blockExplorer: 'https://mumbai.polygonscan.com',
  isTestnet: true
};

before(() => {
});

describe('CryptoLeague', () => {
  beforeEach(() => {
  });

  context('Test commands', () => {
    it(`First open`, () => {


      cy.setupMetamask(SECRET_WORDS, NETWORK_CONFIG, METAMASK_PASSWORD).then(
        setupFinished => {
          expect(setupFinished).to.be.true;
        },
      );

      cy.visit('/');
      cy.switchToMetamaskWindow();

      cy.acceptMetamaskAccess().then(connected => {
        expect(connected).to.be.true;
      });

      cy.visit('/');
      cy.switchToCypressWindow();

      cy.confirmMetamaskSignatureRequest().then(confirmed => {
        expect(confirmed).to.be.true;
      });

      cy.switchToCypressWindow();
      cy.contains('Setup House').click();

      cy.contains('NFT').click();

      // TODO: Get by class
      cy.get('input.CrInput-inputField').type('Synpress house');
      cy.get('textarea.CrInput-inputField').type(
        'You will be rich, I can tell',
      );
      cy.contains('Continue').click();

      cy.contains('Select option').click();
      cy.contains('Club').click();
      cy.contains('Continue').click();

      // Single portfolio manager
      cy.contains('Next').click();

      // Community
      cy.get('[type="checkbox"]').click();
      cy.get('div.CrTooltip')
        .click()
        .type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}');
      cy.get('textarea.CrInput-inputField').type('No robots allowed');
      cy.contains('Next').click();

      // No fees
      cy.contains('Next').click();

      // Accept terms
      cy.contains('Accept Terms').click();

      //cy.get('div.CrButtonGroup mt-4').contains('Accept').click();

      cy.get('div.CrModal-body')
        .should('be.visible')
        .contains('Accept')
        .click();

      cy.contains('Confirm & Continue').click();
      cy.contains('Processing...');
      cy.confirmMetamaskTransaction({
        gasLimit: 1000000,
        baseFee: 100,
        priorityFee: 10,
      }).then(txData => {
        expect(txData.confirmed).to.be.true;
      });

      cy.wait(1000000);
    });
  });
});
