import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

interface Lesson {
    id: number;
    title: string;
    duration: string;
    description: string;
}

@Component({
    selector: 'app-drag-and-drop-test',
    standalone: false,
    template: `
    <ng-container>
        <section 
            cdkDropList 
            cdkDropListOrientation="mixed" 
            (cdkDropListDropped)="onDrop($event)"
            class="flex flex-wrap gap-4 p-4 border-4 border-dotted"
        >
            @for (lesson of lessons; track $index) {
                 <div cdkDrag class="w-[calc(25%-16px)] border border-black/30 rounded-lg p-2" >
                    <div class="example-custom-placeholder w-[calc(25%-16px)]" *cdkDragPlaceholder></div>
                    <div >
                        <p-card>
                            <ng-template pTemplate="header">
                                <h2>{{ lesson.title }} - {{lesson.id}}</h2>
                            </ng-template>
                            <ng-template pTemplate="content">
                                <p><strong>Duration:</strong> {{ lesson.duration }}</p>
                                <p>{{ lesson.description }}</p>
                            </ng-template>
                        </p-card>
                    </div>
                </div>
            }
           
        </section>
    </ng-container>
    `,
    styles: [`
        .example-list {
  width: 500px;
  max-width: 100%;
  border: solid 1px #ccc;
  min-height: 60px;
  display: block;
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

.example-box {
  padding: 20px 10px;
  border-bottom: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: move;
  background: white;
  font-size: 14px;
}

.cdk-drag-preview {
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
              0 8px 10px 1px rgba(0, 0, 0, 0.14),
              0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.example-box:last-child {
  border: none;
}

.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.example-custom-placeholder {
  background: #ccc;
  border: dotted 3px #999;
  min-height: 60px;
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
`]
})
export class DragAndDropTestComponent {
    public lessons = [
        {
            id: 1,
            title: 'Angular',
            duration: '3 hours',
            description: 'Learn the basics of Angular framework.',
        },
        {
            id: 2,
            title: 'TypeScript',
            duration: '2 hours',
            description: 'Introduction to TypeScript and its features.',
        },
        {
            id: 3,
            title: 'RxJS',
            duration: '2.5 hours',
            description: 'Reactive programming with RxJS in Angular.',
        },
        {
            id: 4,
            title: 'NgRx',
            duration: '2 hours',
            description: 'State management in Angular using NgRx.',
        },
    ];

    public onDrop(event: CdkDragDrop<Lesson[]>): void {
        console.log(event.previousIndex, event.currentIndex);
        moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);

    }
}