"""empty message

Revision ID: 2ad2d0f371d3
Revises: 4b54b5da67d4
Create Date: 2016-06-22 14:11:20.144597

"""

# revision identifiers, used by Alembic.
revision = '2ad2d0f371d3'
down_revision = '5968a1fac1ed'

from alembic import op

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade():
    ## commands auto generated by Alembic - please adjust! ###
    ## end Alembic commands ###

    op.create_table(
        'manufacturer',
        sa.Column('id', sa.INTEGER(), server_default="nextval('tree_id_seq'::regclass)", nullable=False),
        sa.Column('name', sa.VARCHAR(length=255), nullable=False),
        sa.Column('markings', sa.Unicode(255), nullable=True),
        sa.Column('location', sa.Unicode(255), nullable=True),
        sa.Column('description', sa.Unicode(2048), nullable=True),
        sa.PrimaryKeyConstraint('id', name=u'manufacturer_pkey')
    )


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    ##drop_column# end Alembic commands ###
    # op.alter_column(table_name='manufacturer', column_name='name', type_=postgresql.VARCHAR(50), nullable=False)
    # op.drop_column('manufacturer', 'markings')
    # op.drop_column('manufacturer', 'location')
    # op.drop_column('manufacturer', 'description')
    op.execute(sql='DROP TABLE manufacturer CASCADE')
