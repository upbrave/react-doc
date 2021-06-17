import React, { useState } from 'react';
import { FormattedMessage, injectIntl, IntlProvider, FormattedDate } from 'react-intl';
import { Button, Space } from 'antd';

interface IMessage {
  zh: any;
  en: any;
}

type Ilocal = keyof IMessage
const messages: IMessage = {
  zh: {
    hello: '你好',
    no: '不可以',
  },
  en: {
    hello: 'hello',
    no: 'no',
  },
};

const WithInjectIntlWrapped = injectIntl((props) => {
  return (
    <div>
    <Space>
      <span>{props.intl.formatMessage({ id: 'hello',defaultMessage:'你好' })}</span>
      <FormattedMessage id='no' ></FormattedMessage>
      <FormattedMessage id='notValid' defaultMessage='这是不存在的文案'></FormattedMessage>
      <FormattedDate value={new Date()}></FormattedDate>
    </Space>
    </div>
  );
});

export default () => {

  const defaultLocale: Ilocal = 'zh';
  const [currentLang, setCurrentLang] = useState<Ilocal>(defaultLocale);
  return (
    <div>
      <Button onClick={() => {
        setCurrentLang(currentLang === 'zh' ? 'en' : 'zh');
      }}>切换中英文</Button>
      <span style={{ paddingLeft: 20 }}>当前:{currentLang}</span>
      <IntlProvider
        locale={currentLang}
        key={currentLang}
        messages={messages[currentLang]}
        defaultLocale={currentLang}
      >
        <WithInjectIntlWrapped></WithInjectIntlWrapped>
      </IntlProvider>
    </div>

  );
}
