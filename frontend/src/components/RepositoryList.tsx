import * as React from "react";
import { Component } from 'react';
import * as Popover from 'react-popover';

import * as editIcon from '../assets/img/edit-icon.svg';
import '../assets/scss/RepositoryList.scss';
import '../assets/scss/AddTagPopover.scss';

export interface RepositoryListProps {
    repositories: any[];
    onUpdateTags: (respository:any, tags: string) => void;
}
export default class RepositoryList extends Component<RepositoryListProps> {
    render() {
        const { repositories, onUpdateTags } = this.props;
        return repositories && (
            <ul className="repository-list">
                {repositories.map(repository => (
                    <li key={repository.hash}>
                        <a href={repository.url}>{repository.title}</a>
                        <p>{repository.description}</p>
                        <TagsList repository={repository} onUpdateTags={onUpdateTags}/>
                    </li>
                ))}
            </ul>
        );
    }
}

interface TagsListProps {
    repository: any;
    onUpdateTags: (respository:any, tags: string) => void;
}
class TagsList extends Component<TagsListProps> {
    public state = {
        addTagOpened: false,
        tagsValue: "",
    }

    constructor(props: TagsListProps){
        super(props);
        this.state = {
            ...this.state,
            tagsValue: props.repository.tags.join(', '),
        }
    }

    handleTagsChange = (e) => {
        this.setState({
            ...this.state,
            tagsValue: e.target.value,
        })
    }

    toggleAddTag = (addTagOpened) => {
        this.setState({ ...this.state, addTagOpened});
    }

    handlePopoverToggle = () => {
        this.toggleAddTag(!this.state.addTagOpened);
    }

    handleUpdateTags = () => {
        const { repository, onUpdateTags } = this.props;
        const { tagsValue } = this.state;
        onUpdateTags(repository, tagsValue);
    }

    render() {
        const { repository: { tags, hash } } = this.props;
        const { addTagOpened, tagsValue } = this.state;
        return (
            <ul className="tags-list">
                {tags && tags.map(tag => (
                    <li key={`${hash}-${tag}`}>{tag}</li>
                ))}
                <Popover
                    className='add-tag-popover'
                    preferPlace='below'
                    isOpen={addTagOpened}
                    onOuterAction={this.handlePopoverToggle}
                    children={(
                        <li className='add-tag' key={`${hash}-add-tag`} onClick={this.handlePopoverToggle}>
                            <img src={editIcon}/>
                        </li>
                    )}
                    body={[
                        (<label>Tags</label>),
                        (<input value={tagsValue} onChange={this.handleTagsChange}/>),
                        (<div>
                            <span>*Separete tags by commas</span>
                            <button onClick={this.handleUpdateTags}>Update</button>
                        </div>)
                    ]}
                />
            </ul>
        );
    }
}