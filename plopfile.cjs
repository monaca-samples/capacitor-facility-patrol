const path = require('path')

module.exports = function (plop) {
  plop.setGenerator('functional component', {
    description:
      'Generate a functional component with container, markup, types, and index files',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your component?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.container.tsx',
        templateFile: path.resolve(
          __dirname,
          'plop-templates/component.container.hbs'
        )
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.markup.tsx',
        templateFile: path.resolve(
          __dirname,
          'plop-templates/component.markup.hbs'
        )
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.types.ts',
        templateFile: path.resolve(
          __dirname,
          'plop-templates/component.types.hbs'
        )
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/index.ts',
        templateFile: path.resolve(__dirname, 'plop-templates/index.hbs')
      }
    ]
  })

  plop.setGenerator('provider with hook', {
    description:
      'Generate a provider with its context, types, and a hook to access the context',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your provider?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/provider/{{dashCase name}}/{{dashCase name}}-provider.context.ts',
        templateFile: path.resolve(
          __dirname,
          'plop-templates/provider.context.hbs'
        )
      },
      {
        type: 'add',
        path: 'src/provider/{{dashCase name}}/{{dashCase name}}-provider.tsx',
        templateFile: path.resolve(__dirname, 'plop-templates/provider.hbs')
      },
      {
        type: 'add',
        path: 'src/provider/{{dashCase name}}/{{dashCase name}}-provider.types.ts',
        templateFile: path.resolve(
          __dirname,
          'plop-templates/provider.types.hbs'
        )
      },
      {
        type: 'add',
        path: 'src/hooks/use-{{dashCase name}}.ts',
        templateFile: path.resolve(__dirname, 'plop-templates/use-provider.hbs')
      }
    ]
  })

  plop.setGenerator('page', {
    description: 'Generate a new page with container and markup',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your page?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{dashCase name}}/{{dashCase name}}.container.tsx',
        templateFile: 'plop-templates/page.container.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{dashCase name}}/{{dashCase name}}.markup.tsx',
        templateFile: 'plop-templates/page.markup.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{dashCase name}}/{{dashCase name}}.types.ts',
        templateFile: 'plop-templates/page.types.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/index.hbs'
      }
    ]
  })
}
