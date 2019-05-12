import './MissionList.css';
import React, {Component} from 'react';
import { Container, Card, Image, Icon } from 'semantic-ui-react'

const src = 'http://placehold.it/200C.png';

class MissionList extends Component {

  render() {
    return (
      <Container className="content">
        <Card.Group itemsPerRow={4}>
          <Card raised color='green'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Yela</Card.Header>
              <Card.Description>
                11.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                10
              </a>
            </Card.Content>
          </Card>

          <Card raised color='red'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Stanton</Card.Header>
              <Card.Description>
                15.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                1
              </a>
            </Card.Content>
          </Card>

          <Card raised color='red'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Arccorp</Card.Header>
              <Card.Description>
                12.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                2
              </a>
            </Card.Content>
          </Card>

          <Card raised color='green'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Yela</Card.Header>
              <Card.Description>
                11.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                10
              </a>
            </Card.Content>
          </Card>

          <Card raised color='red'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Stanton</Card.Header>
              <Card.Description>
                15.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                1
              </a>
            </Card.Content>
          </Card>

          <Card raised color='red'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Arccorp</Card.Header>
              <Card.Description>
                12.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                2
              </a>
            </Card.Content>
          </Card>

          <Card raised color='green'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Yela</Card.Header>
              <Card.Description>
                11.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                10
              </a>
            </Card.Content>
          </Card>

          <Card raised color='red'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Stanton</Card.Header>
              <Card.Description>
                15.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                1
              </a>
            </Card.Content>
          </Card>

          <Card raised color='red'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Arccorp</Card.Header>
              <Card.Description>
                12.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                2
              </a>
            </Card.Content>
          </Card>

          <Card raised color='green'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Yela</Card.Header>
              <Card.Description>
                11.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                10
              </a>
            </Card.Content>
          </Card>

          <Card raised color='red'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Stanton</Card.Header>
              <Card.Description>
                15.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                1
              </a>
            </Card.Content>
          </Card>

          <Card raised color='red'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Mission to Arccorp</Card.Header>
              <Card.Description>
                12.May.2019
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                2
              </a>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    );
  }

}

export default MissionList;
