import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemGradesAPI implements InMemoryDbService {
  createDb() {
    const grades = {

      name: '李泽钧',
      rank: '60.2%',
      mean: '76',
      id: '15030140064',
      subjects: [
        {
          name: '概率论', credit: 4, score: 51, dev: 0,
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '大学生健康教育', credit: 0.1, isSpecial: true, special: '合格',
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '专业教育', credit: 1.0, isSpecial: true, special: '不合格',
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '高等数学', credit: 4, score: 80, dev: 5,
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '计算程序设计', credit: 4, score: 51, dev: -10,
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '形势与政策', credit: 0.1, isSpecial: true, special: '合格',
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '线性代数', credit: 1.0, isSpecial: true, special: '不合格',
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '大学物理', credit: 4, score: 80, dev: 5,
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '数据结构', credit: 4, score: 51, dev: -10,
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '操作系统', credit: 0.1, isSpecial: true, special: '合格',
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '数据库', credit: 1.0, isSpecial: true, special: '不合格',
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        },
        {
          name: '分布式系统', credit: 4, score: 80, dev: 5,
          distribute: [
            {count: Math.floor(Math.random() * 100), label: '90-100'},
            {count: Math.floor(Math.random() * 100), label: '80-89'},
            {count: Math.floor(Math.random() * 100), label: '70-79'},
            {count: Math.floor(Math.random() * 100), label: '60-69'},
            {count: Math.floor(Math.random() * 100), label: '0-60'}
          ]
        }
      ]
    };

    return {grades};
  }
}
