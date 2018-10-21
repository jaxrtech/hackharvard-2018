
import * as React from 'react';
import { AgentBar, Avatar, Column, Title, Subtitle, MessageText, MessageButton, MessageButtons, ThemeProvider, MessageList, MessageGroup, Message, MessageMedia, MessageTitle } from '@livechat/ui-kit';

export class ChatBotPanel extends React.Component {

  public render() {
    return (
      <ThemeProvider>{
        <div>
          <MessageList active="true">
            <MessageGroup
              avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
              onlyFirstWithMeta="true"
            >
              <Message authorName="Jon Smith" date="21:37">
                <MessageTitle title="Message title" subtitle="24h" />
                <MessageText>
                  The fastest way to help your customers - start chatting with visitors
        </MessageText>
                <MessageButtons>
                  <MessageButton label="View more" primary={true} />
                  <MessageButton label="Cancel" />
                </MessageButtons>
                <MessageText>
                  The fastest way to help your customers - start chatting with visitors
                  who need your help using a free 30-day trial.
        </MessageText>
                <MessageButtons>
                  <MessageButton label="View more" primary={true} />
                  <MessageButton label="Cancel" />
                </MessageButtons>
              </Message>
              <Message date="21:38" authorName="Jon Smith">
                <MessageText>Hi! I would like to buy those shoes</MessageText>
              </Message>
            </MessageGroup>
            <MessageGroup onlyFirstWithMeta={this}>
              <Message date="21:38" isOwn={true} authorName="Visitor">
                <MessageText>
                  I love them
                  sooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                  much!
        </MessageText>
              </Message>
              <Message date="21:38" isOwn={true} authorName="Visitor">
                <MessageText>This helps me a lot</MessageText>
              </Message>
            </MessageGroup>
            <MessageGroup
              avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
              onlyFirstWithMeta={true}
            >
              <Message authorName="Jon Smith" date="21:37">
                <MessageText>No problem!</MessageText>
              </Message>
              <Message
                authorName="Jon Smith"
                imageUrl="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
                date="21:39"
              >
                <MessageText>
                  The fastest way to help your customers - start chatting with visitors
                  who need your help using a free 30-day trial.
        </MessageText>
              </Message>
              <Message authorName="Jon Smith" date="21:39">
                <MessageText>
                  The fastest way to help your customers - start chatting with visitors
                  who need your help using a free 30-day trial.
        </MessageText>
              </Message>
            </MessageGroup>
          </MessageList>
        </div>
      }</ThemeProvider>
    );
  }
}